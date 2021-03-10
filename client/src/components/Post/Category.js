import React from 'react'
import { Link } from 'react-router-dom';
import { Badge, Button } from 'reactstrap';

function Category({allCategories}) {
    console.log(allCategories);
    return (
        <>
            {
                Array.isArray(allCategories) ? allCategories.map(({categoryname, categorynum})=>(
                    <div key = {categoryname} className="mx-1 mt-1 my_category">
                        <Link 
                            to={`posts/category/${categoryname}`}
                            className ="text-dark text-decoration-none">
                                <span className="ml-1">
                                        <Button color="info">
                                            {categoryname}{" "}
                                            <Badge color="light">{categorynum}</Badge>
                                        </Button>
                                </span>
                        </Link>
                    </div>
                )) : ""
            }
        </>
    )
}

export default Category
