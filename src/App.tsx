
import './App.css'
import { useState,useEffect } from 'react';
import CardComponent from './component/CardComponent';
import FormComponent from './component/FormComponent';
import { Button, Modal, Spinner } from "flowbite-react";
type Product={
    readonly id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string
}
type Status='idle'|'success'|'error'|'loading'
function App() {
  const[products,setProduct]=useState<Product[]>([])
  const[status,setStatus]=useState<Status>('idle')
  const [dataForm, setDataForm] = useState({});
  const [openModal, setOpenModal] = useState(false);
  useEffect(()=>{
    setStatus('loading')
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(pro=>{
      setProduct(pro)
      setStatus("success")
    })
    .catch(err=>{
      setStatus('error')
    });
  },[]);

  if(status=="loading")
  {
    return (
      <div className='h-screen grid place-content-center'>
       <h1 className='text-6xl'>Loading...</h1>
      </div>
    )
  }
  function getDataForm(product:any)
  {
    setDataForm(product)
  }
  const createProduct = async () => {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: {
        "Content-type": "application/json",
        
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
      setOpenModal(false)
  };

  return (
    <>
      <div className="mx-auto container grid place-content-center mb-2">
        <Button onClick={() => setOpenModal(true)}>Create Product</Button>
      </div>
      <div className="container mx-auto grid grid-cols-3 gridd-flow-row gap-4">
        {products.map((product) => (
          <CardComponent
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create New Product</Modal.Header>
        <Modal.Body>
          <div className='grid place-content-center'>
          <FormComponent getDataForm={getDataForm} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App
