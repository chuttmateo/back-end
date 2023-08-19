import { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";

function CrearCategoria() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    image:""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    const imageToBase64 = (image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
      });
    };

    const categoriaData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      image: imageToBase64(formData.image)
    };

    try {
      const response = await fetch("http://3.144.46.39:8080/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoriaData),
      });

      if (response.status == 400) {
        const res = await response.text();
        console.log("Error al crear el categoria: " + res);
        //  mostar cartel de error de acuerdo a la respuesta
        //  la api responde con 400 cuando el nombre ya existe
        alert("Error al crear el categoria: " + res); // sacar esta chanchada
      }
      if (response.ok) {
        console.log("Categoria creado correctamente.");
        // mostrar cartel de categoria agregado
        alert("Categoria creado correctamente."); // sacar esta chanchada
        // limpiar formulario y estados
        setFormData({
          nombre: "",
          descripcion: "",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud.");
      // atajando otros errores para que no explote
      alert("Error en la solicitud."); // sacar esta chanchada
    }
  };

  return (
    <div className="form">
      <h2>Agregar Categoria</h2>
      <FormControl sx={{ m: 1, minWidth: 850 }}>
        <TextField
          label="Nombre:"
          variant="outlined"
          required
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 850 }}>
        <TextField
          label="Descripcion:"
          variant="outlined"
          required
          type="text"
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 850 }}>

      <div>
              {formData.image && (
                <div>
                  <img
                    className="uploadimg"
                    src={URL.createObjectURL(formData.image)}
                    alt={`Imagen`}
                  />
                  
                </div>
              )}
              <input
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 850 }}>
        <Button
          sx={{ minWidth: 850 }}
          type="button"
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </FormControl>
    </div>
  );
}

export default CrearCategoria;
