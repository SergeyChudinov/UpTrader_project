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
                <input onChange={onUpdateSearch}
                    type="text" 
                    className="search_panel"
                    placeholder="Поиск по номеру задачи и заголовку"
                    value={term}/> 
            </div>
        </> 
    )
}
export default SearchPanel;
