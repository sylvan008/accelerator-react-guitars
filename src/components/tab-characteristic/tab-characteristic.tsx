import {Guitar} from '../../types/guitar';
import {Tab} from '../../types/tab';

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
          <td className="tabs__value">{type}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Количество струн:</td>
          <td className="tabs__value">{stringCount}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TabCharacteristic;
