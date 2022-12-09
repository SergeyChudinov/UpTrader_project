import {  useState } from 'react';

const SearchPanel = (props) => {
    const [term, setTerm] = useState('');

    const onUpdateSearch = (e) => {
        const term = e.target.value;
        setTerm(term);
        props.onUpdateSearch(term);
    }

    return (
        <>
            <div className="search_body">
                <p className="filter_text">Поиск по номеру задачи и заголовку</p>
                <input onChange={onUpdateSearch}
                    type="text" 
                    className="search_panel"
                    value={term}/> 
            </div>
        </> 
    )
}
export default SearchPanel;
