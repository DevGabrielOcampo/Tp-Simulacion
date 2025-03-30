import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

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
            ),
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
            ),
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
            ),
        media: Yup.number()
            .test(
                'media-required',
                'La media es requerida',
                function (value) {
                    const { option } = this.parent;
                    if (option === '3') {
                        return value !== undefined && value !== '';
                    }
                    return true; // No es requerido si no se selecciona Normal
                }
            ),
    });

    // Función para manejar la petición al backend
    const fetchDataFromBackend = async (values) => {

        setIsLoading(true);
        // Aquí se hace la petición al backend        
        const { number, option, rangeA, rangeB, desv, media, lambda, intervalos } = values;
        const url = `http://localhost:8080/api/muestra/${number},${option},${rangeA || 0},${rangeB || 0},${desv || 0},${media || 0},${lambda || 0}`;
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
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationFormikNumber">
                            <Form.Control
                                type="number"
                                name="number"
                                value={values.number}
                                onChange={handleChange}
                                isInvalid={touched.number && !!errors.number}
                                placeholder="Ingrese tamaño de muestra"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.number}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationFormikIntervalos">
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="10 intervalos"
                                    name="intervalos"
                                    value="10"
                                    onChange={handleChange}
                                    checked={values.intervalos === "10"}
                                    isInvalid={touched.intervalos && !!errors.intervalos}
                                    id="intervalo10"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="15 intervalos"
                                    name="intervalos"
                                    value="15"
                                    onChange={handleChange}
                                    checked={values.intervalos === "15"}
                                    isInvalid={touched.intervalos && !!errors.intervalos}
                                    id="intervalo15"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="20 intervalos"
                                    name="intervalos"
                                    value="20"
                                    onChange={handleChange}
                                    checked={values.intervalos === "20"}
                                    isInvalid={touched.intervalos && !!errors.intervalos}
                                    id="intervalo20"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="30 intervalos"
                                    name="intervalos"
                                    value="30"
                                    onChange={handleChange}
                                    checked={values.intervalos === "30"}
                                    isInvalid={touched.intervalos && !!errors.intervalos}
                                    id="intervalo30"
                                />
                            </div>
                            <Form.Control.Feedback type="invalid">
                                {errors.intervalos}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationFormikOptions">
                            <div>
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
                            <Form.Control.Feedback type="invalid">
                                {errors.option}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Dist Uniforme: [a,b] */}
                    {values.option === "1" && (
                        <Row className="mb-3">
                            <Col md="6">
                                <InputGroup>
                                    <FormControl
                                        type="number"
                                        name="rangeA"
                                        placeholder="Valor a"
                                        value={values.rangeA || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.rangeA && !!errors.rangeA}
                                    />
                                    <FormControl
                                        type="number"
                                        name="rangeB"
                                        placeholder="Valor b"
                                        value={values.rangeB || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.rangeB && !!errors.rangeB}
                                    />
                                </InputGroup>
                                <FormControl.Feedback type="invalid">
                                    {errors.rangeA || errors.rangeB}
                                </FormControl.Feedback>
                            </Col>
                        </Row>
                    )}

                    {/* Dist Exp: lambda */}
                    {values.option === "2" && (
                        <Row className="mb-3">
                            <Col md="6">
                                <InputGroup>
                                    <FormControl
                                        type="number"
                                        name="lambda"
                                        placeholder="Lambda"
                                        value={values.lambda || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.lambda && !!errors.lambda}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lambda}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Row>
                    )}

                    {/* Dist Normal: Media, desviación estandar */}
                    {values.option === "3" && (
                        <Row className="mb-3">
                            <Col md="6">
                                <Form.Label>Desviación estándar y Media</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type="number"
                                        name="desv"
                                        placeholder="Desviación"
                                        value={values.desv || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.desv && !!errors.desv}
                                    />
                                    <FormControl.Feedback type="invalid">
                                        {errors.desv}
                                    </FormControl.Feedback>

                                    <FormControl
                                        type="number"
                                        name="media"
                                        placeholder="Media"
                                        value={values.media || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.media && !!errors.media}
                                    />
                                    <FormControl.Feedback type="invalid">
                                        {errors.media}
                                    </FormControl.Feedback>
                                </InputGroup>
                            </Col>
                        </Row>
                    )}
                    {/* <div>{JSON.stringify(errors)}</div> */}

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Generando...' : 'Generar'}
                    </Button>

                    <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => resetForm()}
                    >
                        Limpiar
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default ObtenerSerie;