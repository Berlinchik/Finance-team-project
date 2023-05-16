import { postTransaction } from 'redux/operations/cashflowOperations';
import { getCurrentUserInfo } from 'redux/operations/authOperations';
import { TextDataInput } from 'components/TextDataInput/TextDataInput';
import { FinanceDataBoard } from 'components/FinanceDataBoard/FinanceDataBoard';
import SelectCategory from 'components/Select/SelectCategory';
import './FormCashFlow.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'redux/selectors/authSelectors';

export const FormCashFlow = () => {
  const [sum, setSum] = useState(0);
  const [coment, setComent] = useState('');
  const [categories, setCategories] = useState(null);
  const [isFieldTouched, setIsFieldTouched] = useState(false);
  const [isErrorCategories, setIsErrorCategories] = useState(false);

  const balance = useSelector(selectUser).balance;

  const dispatch = useDispatch();
  const monthLimit = useSelector(state => state.cashflow.monthLimit);
  const dailyLimit = useSelector(state => state.cashflow.dailyLimit);

  const handlePostTransaction = e => {
    e.preventDefault();

    if (sum === 0) {
      setIsFieldTouched(true);
      setTimeout(() => {
        setIsFieldTouched(false);
      }, 2000);
    } else if (!categories) {
      setIsErrorCategories(true);
      setTimeout(() => {
        setIsErrorCategories(false);
      }, 2000);
    } else {
      const form = {
        type: 'expense',
        category: `${categories.value}`,
        comment: coment ? coment : 'comment',
        sum,
      };

      dispatch(postTransaction(form));
      setSum(0);
    }
  };

  useEffect(() => {
    dispatch(getCurrentUserInfo());
  }, [dispatch]);

  return (
    <div className="Container">
      <form>
        <div className="Form">
          <TextDataInput
            label={'Account balance'}
            placeholder={'75 000'}
            value={`Account balance: UAH ${balance || 0}`}
            isReadOnly={true}
          />

          <label className="labelForm">
            <p className="labelText">Per category</p>
            <SelectCategory getChange={e => setCategories(e)} />
            {isErrorCategories ? (
              <p className="TextDataInput_Error">required field</p>
            ) : null}
          </label>

          <TextDataInput
            onChange={e => setSum(e.target.value)}
            label={'Sum'}
            placeholder={'00.00'}
            value={sum === 0 ? '' : sum}
            isFieldTouched={isFieldTouched}
            fieldError={'required field'}
          />

          <TextDataInput
            label={'Expense comment'}
            onChange={e => setComent(e.target.value)}
            value={coment}
            placeholder={'Concert tickets'}
          />
        </div>
        <FinanceDataBoard
          onSubmit={handlePostTransaction}
          dailyLimit={!dailyLimit ? 600 : dailyLimit}
          monthLimit={!monthLimit ? 1600 : monthLimit}
        />
      </form>
    </div>
  );
};
