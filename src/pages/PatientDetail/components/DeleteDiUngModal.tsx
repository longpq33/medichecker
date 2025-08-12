import React from 'react';
import { Modal } from 'antd';
import { useLanguage } from '@/hooks/useLanguage';

interface DeleteDiUngModalProps {
  visible: boolean;
  deletingDiUng: any;
  onCancel: () => void;
  onOk: () => Promise<void>;
}

export const DeleteDiUngModal: React.FC<DeleteDiUngModalProps> = ({
  visible,
  deletingDiUng,
  onCancel,
  onOk,
}) => {
  const { t } = useLanguage();

  return (
    <Modal
      title={t("diUng.confirmDelete")}
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText={t("common.delete")}
      cancelText={t("common.cancel")}
      okButtonProps={{ danger: true }}
    >
      <p>{t("diUng.deleteConfirm")}</p>
      {deletingDiUng && (
        <p>
          <strong>{deletingDiUng.thuoc.tenThuoc}</strong> ({deletingDiUng.thuoc.maThuoc})
        </p>
      )}
      <p>{t("diUng.deleteWarning")}</p>
    </Modal>
  );
};
