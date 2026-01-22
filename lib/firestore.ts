import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';

// 타입 정의
export interface Product {
  id?: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  country: string;
  badge: string;
  description: string;
  specs: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface User {
  id?: string;
  uid: string;
  email: string;
  name: string;
  phone?: string;
  grade: 'Silver' | 'Gold' | 'VIP';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Order {
  id?: string;
  userId: string;
  productId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: '결제완료' | '구매대행중' | '배송중' | '배송완료' | '취소';
  paymentKey?: string;
  orderId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Address {
  id?: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  detail: string;
  isDefault: boolean;
  createdAt?: Timestamp;
}

// ============ 상품 관련 함수 ============
export const productsCollection = collection(db, 'products');

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(query(productsCollection, orderBy('createdAt', 'desc')));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

export async function getProduct(id: string): Promise<Product | null> {
  const docRef = doc(db, 'products', id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Product;
  }
  return null;
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(productsCollection, {
    ...product,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<void> {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, {
    ...product,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
}

// ============ 사용자 관련 함수 ============
export const usersCollection = collection(db, 'users');

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
  const docRef = doc(db, 'users', user.uid);
  await setDoc(docRef, {
    ...user,
    grade: 'Silver',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function getUser(uid: string): Promise<User | null> {
  const docRef = doc(db, 'users', uid);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as User;
  }
  return null;
}

export async function updateUser(uid: string, data: Partial<User>): Promise<void> {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function getAllUsers(): Promise<User[]> {
  const snapshot = await getDocs(query(usersCollection, orderBy('createdAt', 'desc')));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
}

// ============ 주문 관련 함수 ============
export const ordersCollection = collection(db, 'orders');

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(ordersCollection, {
    ...order,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getOrder(id: string): Promise<Order | null> {
  const docRef = doc(db, 'orders', id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Order;
  }
  return null;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(ordersCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
}

export async function getAllOrders(): Promise<Order[]> {
  const snapshot = await getDocs(query(ordersCollection, orderBy('createdAt', 'desc')));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  const docRef = doc(db, 'orders', id);
  await updateDoc(docRef, {
    status,
    updatedAt: Timestamp.now(),
  });
}

export async function getRecentOrders(count: number = 5): Promise<Order[]> {
  const q = query(ordersCollection, orderBy('createdAt', 'desc'), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
}

// ============ 배송지 관련 함수 ============
export const addressesCollection = collection(db, 'addresses');

export async function getUserAddresses(userId: string): Promise<Address[]> {
  const q = query(addressesCollection, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Address));
}

export async function addAddress(address: Omit<Address, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(addressesCollection, {
    ...address,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateAddress(id: string, data: Partial<Address>): Promise<void> {
  const docRef = doc(db, 'addresses', id);
  await updateDoc(docRef, data);
}

export async function deleteAddress(id: string): Promise<void> {
  const docRef = doc(db, 'addresses', id);
  await deleteDoc(docRef);
}

// ============ 초기 상품 데이터 시딩 ============
export async function seedProducts(): Promise<void> {
  const initialProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: '나이키 에어맥스 97 실버불릿',
      brand: 'Nike',
      category: '스니커즈',
      price: 189000,
      originalPrice: 229000,
      image: '👟',
      country: '미국',
      badge: 'HOT',
      description: '1997년 첫 출시 이후 아이코닉한 디자인으로 사랑받는 나이키 에어맥스 97.',
      specs: ['풀 렝스 에어 유닛', '메쉬 & 합성 소재 어퍼', '고무 밑창', '리플렉티브 디테일'],
    },
    {
      name: '샤넬 클래식 플랩백 미디움',
      brand: 'Chanel',
      category: '명품가방',
      price: 8900000,
      originalPrice: 10500000,
      image: '👜',
      country: '프랑스',
      badge: 'LUXURY',
      description: '샤넬의 시그니처 클래식 플랩백.',
      specs: ['캐비어 가죽', '골드 체인 스트랩', '더블 플랩 디자인', '버건디 레더 안감'],
    },
    {
      name: '라메르 크림 60ml',
      brand: 'La Mer',
      category: '화장품',
      price: 320000,
      originalPrice: 420000,
      image: '💄',
      country: '미국',
      badge: 'SALE',
      description: '전설적인 미라클 브로스를 함유한 라메르 크림.',
      specs: ['미라클 브로스 함유', '60ml 용량', '올 스킨 타입', '집중 보습 케어'],
    },
    {
      name: '애플 아이폰 16 Pro Max 256GB',
      brand: 'Apple',
      category: '전자기기',
      price: 1590000,
      originalPrice: 1900000,
      image: '📱',
      country: '미국',
      badge: 'NEW',
      description: '애플의 최신 플래그십 스마트폰.',
      specs: ['A18 Pro 칩셋', '6.9인치 Super Retina XDR', '48MP 메인 카메라', '256GB 저장공간'],
    },
    {
      name: '테스트 상품 (결제 테스트용)',
      brand: 'TEST',
      category: '테스트',
      price: 100,
      originalPrice: 1000,
      image: '🧪',
      country: '한국',
      badge: 'TEST',
      description: '토스페이먼츠 결제 테스트를 위한 100원 상품입니다.',
      specs: ['결제 테스트용', '100원', '환불 가능', '테스트 전용'],
    },
  ];

  for (const product of initialProducts) {
    await addProduct(product);
  }

  console.log('상품 데이터 시딩 완료!');
}
