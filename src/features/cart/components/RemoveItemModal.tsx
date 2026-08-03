import React from 'react';
import { useCartStore } from '../store/cartStore';
import { useNotificationStore } from '../../notifications/store/notificationStore';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { AlertTriangle } from 'lucide-react';

/**
 * Remove Item Confirmation Modal Component.
 * Fulfills Requirement 1 for removing item dialog window.
 */
export const RemoveItemModal: React.FC = () => {
  const { itemToRemove, setItemToRemove, removeItem } = useCartStore();
  const addToast = useNotificationStore((state) => state.addToast);

  const isOpen = Boolean(itemToRemove);

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      const productName = itemToRemove.name;
      removeItem(itemToRemove.id);
      addToast(`已將「${productName}」從購物車移除`, 'info', '已移除商品');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setItemToRemove(null)}
      title="確認移除商品"
      footer={
        <>
          <Button variant="secondary" onClick={() => setItemToRemove(null)}>
            取消
          </Button>
          <Button variant="danger" onClick={handleConfirmRemove}>
            確認移除
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            padding: '0.75rem',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AlertTriangle size={24} />
        </div>
        <div>
          <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            您確定要移除「{itemToRemove?.name}」嗎？
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            此操作將會從您的購物車中刪除該商品。
          </p>
        </div>
      </div>
    </Modal>
  );
};
