import { useEffect, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import axios from "axios";

function CrearProducto() {
  const apiUrl = "http://3.144.46.39:8080/categorias";
  const apiUrlCar = "http://3.144.46.39:8080/caracteristicas";

  const [listCategoriaState, setListCategoriaState] = useState([]);
  const [listCaracteristicas, setListCaracteristicas] = useState([]);

  const [token, setToken] = useState("");

  useEffect(() => {
    axios.get(apiUrl).then((res) => setListCategoriaState(res.data));
    axios.get(apiUrlCar).then((res) => setListCaracteristicas(res.data));
    setToken(JSON.parse(localStorage.getItem("userData")).token);
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    detalles: [{ descripcion: "", cantidad: "", precio: "" }],
    images: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const newDetalles = [...formData.detalles];
    newDetalles[index][field] = value;
    setFormData({
      ...formData,
      detalles: newDetalles,
    });
  };

  const handleImageChange = (event, index) => {
    const newImages = [...formData.images];
    newImages[index] = event.target.files[0];
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
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
    const base64Images = await Promise.all(formData.images.map(imageToBase64));
    const imgs = [];
    base64Images.forEach((img) => {
      imgs.push({ image: img });
    });
    const productoData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      categoria: {
        id: listCategoriaState.find((i) => i.nombre == formData.categoria).id,
      },
      detalles: formData.detalles,
      imagenes: imgs,
    };

    try {
      const response = await fetch("http://3.144.46.39:8080/productos", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoData),
      });

      if (response.status == 400) {
        const res = await response.text();
        console.log("Error al crear el producto: " + res);
        //  mostar cartel de error de acuerdo a la respuesta
        //  la api responde con 400 cuando el nombre ya existe
        alert("Error al crear el producto: " + res); // sacar esta chanchada
      }
      if (response.ok) {
        console.log("Producto creado correctamente.");
        // mostrar cartel de producto agregado
        alert("Producto creado correctamente."); // sacar esta chanchada
        // limpiar formulario y estados
        setFormData({
          nombre: "",
          descripcion: "",
          categoria: "",
          detalles: [{ descripcion: "", cantidad: "", precio: "" }],
          images: [],
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
      <Box component="form" onSubmit={handleSubmit}>
        <h2>Agregar Producto</h2>
        <FormControl sx={{ m: 1, minWidth: 850 }} required>
          <TextField
            fullWidth
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
        <FormControl sx={{ m: 1, minWidth: 850 }} required>
          <TextField
            fullWidth
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
          <InputLabel id="cat" htmlFor="categoria">
            Categoria
          </InputLabel>
          <Select
            labelId="cat"
            name="categoria"
            id="categoria"
            value={formData.categoria}
            label="Categoria"
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>Sin Categoria</em>
            </MenuItem>
            {listCategoriaState.map((cat) => (
              <MenuItem key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 850 }}>
          <div className="form-group">
            <h3>Caracteristicas</h3>

            {formData.detalles.map((detalle, index) => (
              <div key={index}>
                <FormControl sx={{ m: 1, minWidth: 400 }}>
                  <InputLabel id={"car" + index} htmlFor={"car" + index}>
                    Caracteristica
                  </InputLabel>
                  <Select
                    labelId={"car" + index}
                    name={"car" + index}
                    id={"car" + index}
                    value={detalle.descripcion}
                    label="Caracteristica"
                    onChange={(e) =>
                      handleItemChange(index, "descripcion", e.target.value)
                    }
                  >
                    <MenuItem value="">
                      <em>Sin Caracteristica</em>
                    </MenuItem>
                    {listCaracteristicas.map((car) => (
                      <MenuItem key={car.id} value={car.nombre}>
                        {car.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  sx={{ m: 1, minWidth: 60 }}
                  label="Cantidad"
                  variant="outlined"
                  required
                  type="number"
                  placeholder="Cantidad"
                  name={"cantidad" + index}
                  value={detalle.cantidad}
                  onChange={(e) =>
                    handleItemChange(index, "cantidad", e.target.value)
                  }
                />

                <TextField
                  sx={{ m: 1, minWidth: 100 }}
                  label="Precio Unitario"
                  variant="outlined"
                  required
                  type="number"
                  placeholder="Precio Unitario"
                  name={"valor" + index}
                  value={detalle.value}
                  onChange={(e) =>
                    handleItemChange(index, "precio", e.target.value)
                  }
                />
                <Button
                  sx={{ m: 1, minWidth: 120 }}
                  className="button-primary"
                  type="button"
                  onClick={() => {
                    const newDetalles = [...formData.detalles];
                    newDetalles.splice(index, 1);
                    setFormData({ ...formData, detalles: newDetalles });
                  }}
                >
                  Quitar
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  detalles: [
                    ...formData.detalles,
                    { descripcion: "", precio: "" },
                  ],
                })
              }
            >
              Agregar Caracteristica
            </Button>
          </div>
          <div className="form-group">
            <label>Imagenes:</label>
            {formData.images.map((image, index) => (
              <div key={index}>
                {image && (
                  <div>
                    <img
                      className="uploadimg"
                      src={URL.createObjectURL(image)}
                      alt={`Imagen ${index}`}
                    />
                    <button type="button" onClick={() => removeImage(index)}>
                      Quitar Imagen
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                setFormData({ ...formData, images: [...formData.images, null] })
              }
            >
              Agregar imagen
            </Button>
          </div>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 850 }}>
          <Button type="submit">Crear Producto</Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default CrearProducto;
