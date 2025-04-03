import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import './obtenerSerie.css'

function ObtenerSerie({ setDatosGenerados }) {
    const [isLoading, setIsLoading] = useState(false);

    const schema = Yup.object().shape({
        number: Yup
            .number()
            .required("Se necesita ingresar un número")
            .positive("Número positivo")
            .integer("Debe ser un número entero")
            .max(1000000, "El número no puede ser mayor que 1000000"),

        intervalos: Yup
            .string()
            .required("Debe seleccionar un intervalo"),

        option: Yup.string().required("Selecciona una opción"),

        //validaciones para distribucion uniforme
        rangeA: Yup.number()
            .test(
                'rangeA-required',
                'Valor A es requerido',
                function (value) {
                    const { option } = this.parent;
                    if (option === '1') {
                        return value !== undefined && value !== '';
                    }
                    return true; // No es requerido si no se selecciona Uniforme
                }
            )
            .test(
                'rangeA-lessThanOrEqualToB',
                'Valor A no puede ser mayor que Valor B',
                function (value) {
                    const { rangeB } = this.parent;
                    if (value && rangeB && value > rangeB) {
                        return false; // Si A es mayor que B, retorna false
                    }
                    return true; // Si no, la validación pasa
                }
            ),

        rangeB: Yup.number()
            .test(
                'rangeB-required',
                'Valor B es requerido',
                function (value) {
                    const { option } = this.parent;
                    if (option === '1') {
                        return value !== undefined && value !== '';
                    }
                    return true; // No es requerido si no se selecciona Uniforme
                }
            )
            .test(
                'rangeB-not-equal-to-A',
                'Valor B no puede ser igual a Valor A',
                function (value) {
                    const { rangeA } = this.parent;
                    if (value && rangeA && value === rangeA) {
                        return false; // Retorna false si A es igual a B
                    }
                    return true;
                }
            ),

        //validaciones para distribucion exponencial 
        lambda: Yup.number()
            .test(
                'lambda-required',
                'Lambda es requerido',
                function (value) {
                    const { option } = this.parent;
                    if (option === '2') {
                        return value !== undefined && value !== '';
                    }
                    return true; // No es requerido si no se selecciona Exponencial
                }
            )
            .test(
                'lambda-positive',
                'Lambda debe ser un número positivo',
                function (value) {
                    const { option } = this.parent;
                    if (option === '2') {
                        return value > 0; // Valida que sea mayor que 0
                    }
                    return true;
                }
            ),

        //validaciones para distribucion normal 
        desv: Yup.number()
        .test(
            'desv-required',
            'La desviación estándar es requerida',
            function (value) {
                const { option } = this.parent;
                if (option === '3') {
                    return value !== undefined && value !== '';
                }
                return true; // No es requerido si no se selecciona Normal
            }
        )
        .test(
            'desv-positive',
            'La desviación estándar debe ser un número positivo',
            function (value) {
                const { option } = this.parent;
                if (option === '3') {
                    return value > 0; // Valida que sea mayor que 0
                }
                return true; // No aplica si no se selecciona Normal
            }
        ),

        media: Yup.number()
        .test(
            'media-required',
            'La media es requerida',
            function (value) {
                const { option } = this.parent;
                if (option === '3') {
                    return value !== undefined && value !== null; // Permite 0 como valor válido
                }
                return true;
            }
        ),

    });

    // Función para manejar la petición al backend
    const fetchDataFromBackend = async (values) => {

        setIsLoading(true);
        // Aquí se hace la petición al backend        
        const { number, option, rangeA, rangeB, desv, media, lambda, intervalos } = values;
        const url = 'http://localhost:8080/api/muestra/${number},${option},${rangeA || 0},${rangeB || 0},${desv || 0},${media || 0},${lambda || 0}';
        try {
            const response = await axios.get(url);
            setDatosGenerados({
                data: response.data,   // Datos generados
                intervalos: intervalos  // Pasamos la cantidad de intervalos
            });
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{
                number: "",
                option: "",
                rangeA: "",
                rangeB: "",
                desv: "",
                media: "",
                lambda: "",
                intervalos: ""
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                console.log("Formulario enviado con los valores:", values);
                fetchDataFromBackend(values);  // Función para hacer la petición
                setSubmitting(false);
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors, resetForm }) => (
                <Form noValidate onSubmit={handleSubmit} className='form'>
                    <Row className='muestra'>
                        <Form.Label className='subtitulo'>Tamaño de la muestra</Form.Label>
                        <Form.Group as={Col} md="4" controlId="validationFormikNumber">
                            <Form.Control
                                className='caja-inputs'
                                type="number"
                                name="number"
                                value={values.number}
                                onChange={handleChange}
                                isInvalid={touched.number && !!errors.number}
                                placeholder="Ingrese tamaño de muestra"
                            />
                            <Form.Control.Feedback type="invalid" className='errores'>
                                {errors.number}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <div className='opciones-grp'>
                    <Row >
                            <Form.Label className='subtitulo'>Cantidad de intervalos</Form.Label>
                            <Form.Group as={Col} md="12" controlId="validationFormikIntervalos">
                                <Form.Select 
                                    name="intervalos" 
                                    value={values.intervalos} 
                                    onChange={handleChange} 
                                    isInvalid={touched.intervalos && !!errors.intervalos}
                                    className='custom-select'
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="10">10 intervalos</option>
                                    <option value="15">15 intervalos</option>
                                    <option value="20">20 intervalos</option>
                                    <option value="30">30 intervalos</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" className='errores'>
                                    {errors.intervalos}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Label className='subtitulo'>Tipos de distribuciones</Form.Label>
                            <Form.Group as={Col} md="12" controlId="validationFormikOptions">
                                <div className='intervalos'>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Uniforme [a, b]"
                                        name="option"
                                        value="1"
                                        onChange={handleChange}
                                        checked={values.option === "1"}
                                        isInvalid={touched.option && !!errors.option}
                                        id="option1"
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Exponencial"
                                        name="option"
                                        value="2"
                                        onChange={handleChange}
                                        checked={values.option === "2"}
                                        isInvalid={touched.option && !!errors.option}
                                        id="option2"
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Normal"
                                        name="option"
                                        value="3"
                                        onChange={handleChange}
                                        checked={values.option === "3"}
                                        isInvalid={touched.option && !!errors.option}
                                        id="option3"
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid" className='errores'>
                                    {errors.option}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </div>

                    {/* Dist Uniforme: [a,b] */}
                    {values.option === "1" && (
                        <Row >
                            <Col md="6">
                            <Form.Label>Limites</Form.Label>
                                <InputGroup className="opcionales">
                                    <FormControl
                                        className='caja-inputs'
                                        type="number"
                                        name="rangeA"
                                        placeholder="Valor a"
                                        value={values.rangeA !== undefined ? values.rangeA : ''}
                                        onChange={handleChange}
                                        isInvalid={touched.rangeA && !!errors.rangeA}
                                    />
                                    <FormControl
                                        className='caja-inputs'
                                        type="number"
                                        name="rangeB"
                                        placeholder="Valor b"
                                        value={values.rangeB !== undefined ? values.rangeB : ''}
                                        onChange={handleChange}
                                        isInvalid={touched.rangeB && !!errors.rangeB}
                                    />
                                </InputGroup>
                                <FormControl.Feedback type="invalid" className='errores'>
                                    {errors.rangeA || errors.rangeB}
                                </FormControl.Feedback>
                            </Col>
                        </Row>
                    )}

                    {/* Dist Exp: lambda */}
                    {values.option === "2" && (
                        <Row >
                            <Col md="6">
                            <Form.Label>Valor de lambda</Form.Label>

                                <InputGroup className="opcionales">
                                    <FormControl
                                        className='caja-inputs'
                                        type="number"
                                        name="lambda"
                                        placeholder="Lambda"
                                        value={values.lambda || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.lambda && !!errors.lambda}
                                    />
                                    <Form.Control.Feedback type="invalid" className='errores'>
                                        {errors.lambda}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Row>
                    )}

                    {/* Dist Normal: Media, desviación estandar */}
                    {values.option === "3" && (
                        <Row>
                            <Col md="6" >
                                <Form.Label>Desviación estándar y Media</Form.Label>
                                <InputGroup  className="opcionales">
                                    <FormControl
                                        className='caja-inputs'
                                        type="number"
                                        name="desv"
                                        placeholder="Desviación"
                                        value={values.desv || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.desv && !!errors.desv}
                                    />
                                    <FormControl.Feedback type="invalid" className='errores'>
                                        {errors.desv}
                                    </FormControl.Feedback>

                                    <FormControl
                                        className='caja-inputs'
                                        type="number"
                                        name="media"
                                        placeholder="Media"
                                        value={values.media !== undefined ? values.media : ''}
                                        onChange={handleChange}
                                        isInvalid={touched.media && !!errors.media}
                                    />
                                    <FormControl.Feedback type="invalid" className='errores'>
                                        {errors.media}
                                    </FormControl.Feedback>
                                </InputGroup>
                            </Col>
                        </Row>
                    )}
                    {/* <div>{JSON.stringify(errors)}</div> */}

                    <div className='boton-grp'>
                        <Button type="submit" disabled={isLoading} className='boton'>
                            {isLoading ? 'Generando...' : 'Generar'}
                        </Button>

                        <Button
                            variant="secondary"
                            className="boton-limpiar"
                            onClick={() => resetForm()}
                        >
                            Limpiar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default ObtenerSerie;