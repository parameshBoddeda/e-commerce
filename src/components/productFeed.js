import React, { useEffect, useState } from "react";

import axios from 'axios';


const ProductFeed = () => {
    const [products, setProducts] = useState([]);
    const [cartInfo, setCartInfo] = useState({});
    const [index, setIndex] = useState([]);

    const LoadFeed = () => {

        axios({
            method: "get",
            url: "https://api.chec.io/v1/products",
            headers: {
                "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
            },
            params: {
                limit: 11,
                page: 1
            }
        }).then((res) => {

            setProducts(res.data.data);


        }).catch((error) => {
            console.log(error);
        })

    }

    const LoadProductsOrCreateCart = () => {
        const cartId = localStorage.getItem('CARTID')
        if (cartId) {
            axios({
                method: 'GET',
                url: `https://api.chec.io/v1/carts/${cartId}`,
                headers: {
                    'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'
                }
            }).then((res) => {
                setCartInfo(res.data)
            }).catch(() => {

            })
        } else {
            axios({
                method: 'GET',
                url: 'https://api.chec.io/v1/carts',
                headers: {
                    'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'
                }
            }).then((res) => {
                localStorage.setItem('CARTID', res.data.id)
                setCartInfo(res.data)

            }).catch(() => {

            })
        }

    }
    const handleClick = (productId) => {
        const cartId = localStorage.getItem('CARTID')
        axios({
            method: 'POST',
            url: `https://api.chec.io/v1/carts/${cartId}`,
            headers: {
                'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'
            },
            data: {
                id: productId
            }
        }).then((res) => {

            setCartInfo(res.data.cart)

        }).catch(() => {

        })

    }
    const items = cartInfo.line_items ? cartInfo.line_items.map((val) => (val.product_id)) : [];
    const itemIds=cartInfo.line_items ? cartInfo.line_items.map((val) => (val.id)) : [];
    console.log(items);
    console.log(itemIds);
    var itemId = itemIds[index]
   console.log(itemId);
    const handleRemove = (id) => {
        const cartId = localStorage.getItem('CARTID')
       for(let i=0; i<items.length; i++){
        if(id === items[i]){  setIndex(i) }
            
       }
       
       
        // if (id!==itemIds) {
            

            axios({
                method: 'DELETE',
                url: `https://api.chec.io/v1/carts/${cartId}/items/${itemId}`,
                headers: {
                    'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'
                },

            }).then((res) => {
                // console.log(res.data.cart);
                setCartInfo(res.data.cart)

            }).catch(() => {

            })
        // }


    }
    useEffect(() => {
        LoadFeed();
        LoadProductsOrCreateCart();

    }, [])


    return (
        <>
            <h1>Shopping Mall</h1>
            {

                <div>
                    <p> Cart Products:{cartInfo.total_items}</p>
                    <p> Grand Total :{cartInfo.subtotal ? cartInfo.subtotal.formatted_with_symbol : 0}</p>
                </div>

            }


            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    products.map((value, ind) => {

                        return (
                            <div key={ind} style={{ margin: 20, border: '2px solid grey' }}>
                                <img style={{ width: '225px', height: '200px' }} src={value.image.url} />
                                <p style={{ width: '225px' }}>{value.name}</p>
                                <p style={{ width: '225px' }}>{value.price.formatted_with_symbol}</p>

                                {
                                   
                                            items.includes(value.id) ?
                                                <button className="btn btn-danger"
                                                    onClick={() => { handleRemove(value.id) }}>
                                                    Remove
                                                </button>
                                                :
                                                <button className="btn btn-primary"
                                                    onClick={() => { handleClick(value.id) }}>
                                                    add
                                                </button>
        
                                      
                                    
                                }
                                


                            </div>

                        )
                    })
                }
            </div>


        </>
    )
}

export default ProductFeed;