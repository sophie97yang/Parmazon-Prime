import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateProduct, getAllProducts } from "../../store/products";
import { useModal } from "../../context/Modal";

const UpdateProductForm = () => {
  const { id } = useParams();
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector((state) => state.products.products);
  const member = useSelector((state) => state.session.member);

  const product = products ? products[id] : null


  if (!member || (member.id!==product?.seller.id)) {
    history.push('/products')
  }


  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const [category, setCategory] = useState(product?.category);
  const [available, setAvailable] = useState(product?.available);

//   const [preview_img, setPreview_img] = useState(product?.preview_image);
//   const [product_image1, setProduct_image1] = useState(product?.product_image1);
//   const [product_image2, setProduct_image2] = useState(product?.product_image2);
//   const [product_image3, setProduct_image3] = useState(product?.product_image3);
//   const [product_image4, setProduct_image4] = useState(product?.product_image4);

  const [imageLoading, setImageLoading] = useState(false);

  const [submitted, yesSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const categories = ["Fresh", "Bloomy Rind", "Washed Rind"];

//   useEffect(() => {
//     dispatch(getAllProducts()).catch((res) => res);
//   }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorList = {};

    if (!name.length || name.length > 30)
      errorList.name = "Name must be between 1 and 31 characters";
    if (!description.length || description.length > 500)
      errorList.description = "Description ust be between 1 and 501 characters";
    if (!price || price < 0)
      errorList.price = "Please set a price minimum of $1";
    if (!available || available < 0)
      errorList.available = "Please add at least 1 availability";
    // if (!preview_img)
    //   errorList.preview_img =
    //     "Please add a preview image (.jpeg, .png, .pdf, .jpeg, .gif)";

    if (Object.values(errorList).length > 0) {
      setErrors(errorList);
      return;
    }

    const form = new FormData();
    // form.append('seller', member.id)
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("category", category);
    form.append("available", available);

    // form.append("preview_image", preview_img);
    // form.append("product_image1", product_image1);
    // form.append("product_image2", product_image2);
    // form.append("product_image3", product_image3);
    // form.append("product_image4", product_image4);

    setImageLoading(true)

    let data = await dispatch(updateProduct(form, id))  //change thunk
    if(data) setImageLoading(false)

    if(!data.errors) {
        history.push(`/products/${id}`)
        yesSubmitted(true)
        closeModal()
        // reset()
        return "success"
    }
  };


    // const reset = () => {
    //   setName("");
    //   setDescription("");
    //   setPrice("0.00");
    //   setCategory("");
    //   setAvailable(1);
    //   setPreview_img(null);
    //   setProduct_image1(null);
    //   setProduct_image2(null);
    //   setProduct_image3(null);
    //   setProduct_image4(null);
    // };

  useEffect(() => {
    yesSubmitted(false);
    setErrors({});
    dispatch(getAllProducts())
  }, [dispatch, submitted]);


  useEffect(() => {
    if(product){
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setCategory(product.category)
        setAvailable(product.available)
        // setPreview_img(product.preview_image)
        // setProduct_image1(product.product_image1)
        // setProduct_image2(product.product_image2)
        // setProduct_image3(product.product_image3)
        // setProduct_image4(product.product_image4)


    }
  }, [product])


  if(product === undefined) return null;

  return (

    <>

      <h1 className="add-product-title">Update Your Product</h1>

    <div className="create-product-container">

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="product-form">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="Name of product"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=""
          />

          {errors.name && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.name}</p>
          )}
        </div>

        <div>
          <label className="label">Description</label>

          <textarea
            type="textarea"
            placeholder="description of product"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-field"
          />

          {errors.description && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.description}</p>
          )}

        </div>

        <div>
          <label className="label">Price</label>
          <input
            type="number"
            placeholder="Price of product"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className=""
          />

          {errors.price && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.price}</p>
          )}

        </div>

        <div>
          <label className="label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=""
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Available</label>
          <input
            type="number"
            min="1"
            placeholder="Name of product"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className=""
          />

          {errors.available && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.available}</p>
          )}
        </div>

        {/* <div>
          <label className="label">Preview Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPreview_img(e.target.files[0])}
            className=""
          />

          {errors.preview_img && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.preview_img}</p>
          )}

        </div>

        <div>
          <label className="label">Product Image 1</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image1(e.target.files[0])}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 2</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image2(e.target.files[0])}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 3</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image3(e.target.files[0])}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 4</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image4(e.target.files[0])}
            className=""
          />
        </div> */}

        <div className="update-product-button">
          <button type="submit">Update Product</button>
        </div>

        {imageLoading && <p>Loading...</p>}

      </form>
    </div>

    </>
  );
};

export default UpdateProductForm;
