import React from 'react';
import {IoIosArrowBack} from 'react-icons/io'

const ContentPagesNavigator = (props) => {
    const {currentPage, itemMethod} = props;
    const Item = props.item;
    const limit = props.limit;
    const result = [];

    if(currentPage > 1)
        result.push(
            <Item 
            link={props.link+(currentPage-1)} 
            class="pageButton"
            title="Go to previous page"
            content={<IoIosArrowBack/>}
            itemMethod = {itemMethod}
            key = {currentPage-1}
            id = {currentPage-1}
        />)

    if(limit > currentPage + 3)
    {
        console.log("HERE");
        for(let i = currentPage; i <= currentPage + 2; i++)
        {
            const item = <Item 
                    id = {i}
                    link={props.link+i}
                    class={i === currentPage ? "pageButton active" : "pageButton"} 
                    title={`Go to page ${i}`}
                    content={i}
                    key = {i}
                    itemMethod = {itemMethod}
                />
            result.push(item);
        }
        result.push(<li key = "separator" className = "separator">...</li>);
        result.push(<Item 
            id = {limit}
            link={props.link+limit}
            class="pageButton"
            title="Go to last page"
            content={limit}
            key = {limit}
            itemMethod = {itemMethod}
        />);
    }
    else
    {
        console.log(currentPage+3)
        for(let i = currentPage; i <= limit; i++)
        {
            const item = <Item 
                    id = {i}
                    link={props.link+i}
                    class={i === currentPage ? "pageButton active" : "pageButton"} 
                    title={`Go to page ${i}`}
                    content={i}
                    itemMethod = {itemMethod}
                    key = {i}
                />
            result.push(item);
        }
    }

    return result;
}

export default ContentPagesNavigator;