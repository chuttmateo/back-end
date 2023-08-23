import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './Detail.css'
import { Box, Grid, Card, CardMedia } from '@mui/material';
import { Galeria } from './Galeria';



const Detail = () => {


  const params = useParams()
  
  const navigate = useNavigate();


  const [licencia, setLicencia] = useState([])
  const [imagenes, setImagenes] = useState([])
  const [descripcion, setDescripcion] = useState([])
  const [detalles, setDetalles] = useState([])
  const [detallesSinDescripcion, setDetallesSinDescripcion] = useState([])
  const [presupuesto, setPresupuesto] = useState(0)

  const [category, setCategory] = useState("")


  const eliminarDescripcion = () => {
    setDetallesSinDescripcion(detalles.splice(0, 1))
  }

  const calcularPresupuesto = () => {
    let precio = 0
    
    detalles.map(detalle => precio +=detalle.precio)
    setPresupuesto(detallesSinDescripcion[0]?.precio + precio)

  }

  useEffect(() =>{
    axios.get('http://3.144.46.39:8080/productos/' + params.id)
    .then(res =>{
      setLicencia(res.data.nombre)
      setImagenes(res.data.imagenes)
      setDescripcion(res.data.detalles[0].descripcion)
      setDetalles(res.data.detalles)
    })
    
  }, [])

  useEffect(() =>{
    eliminarDescripcion()
  }, [descripcion])

  useEffect(() =>{
      calcularPresupuesto()
  }, [detallesSinDescripcion])

  useEffect(() =>{
  }, [detallesSinDescripcion])

  return (
    <div className='detail-contenedor' /* style={{display:'flex', flexDirection:'column'}} */>
      <button onClick={() => navigate(-1)} className='detail-back-button-desktop'>↩atrás</button>
      <div className='detail-contenedor-principal'>
        <div className='detail-contenedor-title'>
          <h4><span>{licencia}</span> </h4>
          <p className='detail-description'>{descripcion}</p>
        </div>
        <div className="container d-flex">
          <div className="row">
            <div className="col-6">
              <img src={imagenes[0]?.ruta}  alt=""  className='img-fluid h-100'/>
            </div>
            <div className='col-6'>
              <Galeria  imagenes={imagenes}/>

            </div>
            {/* <div className="galeria col-6" style={{gap:"3px"}}>
              <div style={{display:"flex", height:"125px", gap:"3px"}}>
                <div>
                  <img src={imagenes[1]?.ruta}  alt=""  className='img-thumbnail' style={{height:"125px"}}/>

                </div>
                <div >
                  <img src={imagenes[2]?.ruta}  alt=""  className='img-thumbnail' style={{height:"125px"}}/>

                </div>

              </div>
              <div style={{display:"flex", gap:"3px"}}>
                <div>
                  <img src={imagenes[3]?.ruta}  alt=""  className='img-thumbnail' style={{height:"125px"}}/>

                </div>
                <div>
                  <img src={imagenes[4]?.ruta}  alt=""  className='img-thumbnail' style={{height:"125px"}}/>
                </div>

              </div>



            </div> */}
          </div>


        </div>

      </div>
      
          <h5 className='detalles'>Características: </h5>

      <div className='detail-characteristics'>


          {detalles[0]?.precio != 0 && detalles?.map((detalle, index)=> <div key={detalle.id}  className='detail-characteristics-check'>
            <img style={{width:'21px'}} src="/comprobar.png" alt="" />
          <p><span>{detalle.descripcion}</span> </p>
          </div>)}
      </div>

      {
        presupuesto? <div> <h5 className='presupuesto'>Presupuesto Total : <span>{presupuesto}</span> USD </h5></div> : <p>Cargando presupuesto</p>
      }
      
        <button onClick={() => navigate(-1)} className='detail-back-button-mobile'>↩atrás</button>

    </div>
  )
}

export default Detail