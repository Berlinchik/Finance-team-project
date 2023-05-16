import { useState } from 'react';

import { FinanceModalForm } from 'components/FinanceModalForm/FinanceModalForm';
import { FormCashFlow } from 'components/FormCashFlow/FormCashFlow';

export const CashflowPage = () => {
  const [isModal, setIsModal] = useState(false);

  const handleToggle = () => {
    setIsModal(prev => !prev);
  };

  return (
    <section>
      <FormCashFlow />
      {isModal ? <FinanceModalForm handleToggle={handleToggle} /> : null}
    </section>
  );
};
