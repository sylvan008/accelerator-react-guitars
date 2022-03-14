import {Guitar} from '../../types/guitar';
import {Tab} from '../../types/tab';
import {GuitarDictionary} from '../../utils/const/locale';

type PropsType = Pick<Guitar, 'vendorCode' | 'type' | 'stringCount'> & Tab;

function TabCharacteristic(props: PropsType): JSX.Element {
  const {type, stringCount, vendorCode} = props;

  return (
    <table className="tabs__table">
      <tbody>
        <tr className="tabs__table-row">
          <td className="tabs__title">Артикул:</td>
          <td className="tabs__value">{vendorCode}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Тип:</td>
          <td className="tabs__value">{GuitarDictionary[type]}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Количество струн:</td>
          <td className="tabs__value">{stringCount} струнная</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TabCharacteristic;
