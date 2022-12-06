import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { activeFilterChanged } from '../../actions';

import './FilterPanel.css';

const FilterPanel = () => {
    const dispatch = useDispatch();
    const {filters, activeFilter} = useSelector(state => state.tasks);

    const filterElements = () => {
        const btns = filters.map((btn, i) => {
            const btnClass = classNames('filter_btn', btn, {
                'active': btn === activeFilter
            });
            return (
                <button key={i + 1} onClick={() => dispatch(activeFilterChanged(btn))}
                    className={btnClass}>  
                        {btn}
                </button>
            )       
        })

        return (
            <div className="filter_card">
                <div className="filter_body">
                    <p className="filter_text">Отфильтруйте задачи по приоритету</p>
                    <div className="filter_btns">
                        {btns}
                    </div>
                </div>
            </div>
        )     
    }
    const filter = filterElements();

    return (
        <>
            {filter}    
        </>
    )
}
export default FilterPanel;