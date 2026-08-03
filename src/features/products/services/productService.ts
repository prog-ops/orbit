import { Product } from '../../../types';

/**
 * Mock Product catalog dataset matching original specification.
 */
const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: '無線藍牙耳機', price: 2999, image: 'earphones.jpg', category: 'Audio', description: '高音質降噪無線藍牙耳機' },
  { id: 2, name: '智慧手錶', price: 8999, image: 'smartwatch.jpg', category: 'Wearables', description: '多功能心率與運動追蹤智慧手錶' },
  { id: 3, name: '便攜式充電器', price: 1299, image: 'powerbank.jpg', category: 'Accessories', description: '20000mAh 大容量快充行動電源' },
  { id: 4, name: '無線滑鼠', price: 899, image: 'mouse.jpg', category: 'Peripherals', description: '符合人體工學靜音無線光學滑鼠' },
  { id: 5, name: '機械鍵盤', price: 3999, image: 'keyboard.jpg', category: 'Peripherals', description: 'RGB背光全尺寸機械電競鍵盤' },
  { id: 6, name: '網路攝影機', price: 2199, image: 'webcam.jpg', category: 'Peripherals', description: '1080P 高畫質自動對焦網路視訊鏡頭' },
  { id: 7, name: 'USB隨身碟', price: 599, image: 'usb.jpg', category: 'Storage', description: '128GB USB 3.2 高速傳輸隨身碟' },
  { id: 8, name: '桌面擴音器', price: 1599, image: 'speaker.jpg', category: 'Audio', description: '立體聲重低音藍牙桌面喇叭' }
];

/**
 * Product Service API layer.
 * Encapsulates network operations with error handling and artificial network latency.
 */
export const productService = {
  /**
   * Fetches all products asynchronously.
   *
   * @returns {Promise<Product[]>} Resolved list of products
   * @throws {Error} Throws network error if simulated API fails
   */
  async fetchProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      // Simulate 600ms latency for smooth UX
      setTimeout(() => {
        resolve(MOCK_PRODUCTS);
      }, 600);
    });
  },
};
