package grupo15.main.Controller;
// Forma parte del paquete grupo15.main.Controller

import grupo15.main.Services.Generadores;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.66:3000"})
// Permitimos el acceso CORS desde dos origenes distintos,
// para comunicarnos con el front

@RestController
@RequestMapping("/api")
public class Controller {
    @GetMapping("/muestra/{datos}")
//  (p.ej. /api/muestra/1000,1,10,20,0,0,0).


    //Define un controlador REST en Spring BOOT que expone un
    // endpoint para generar números aleatorios según diferentes
    // distriiciones estadísticas



    // Recibe 4 floats, el primer representa la muestra, el segundo la distribucion, el tercero y cuarto los intervalos [A, B]
    // el quinto desviacion, el sexto media, el septimo lambda
    public ResponseEntity<List<Float>> recibirNumero(@PathVariable List<Float> datos) {
        Float muestra = datos.get(0);     // Cantidad de números a generar
        Float distribucion = datos.get(1); // Tipo de distribución (1, 2 o 3)
        Float a = datos.get(2);          // Límite inferior del intervalo
        Float b = datos.get(3);          // Límite superior del intervalo
        Float desviacion = datos.get(4); // Desviación estándar (si aplica)(0 sino)
        Float media = datos.get(5);      // Media (si aplica)(0 sino)
        Float lambda = datos.get(6);     // Parámetro lambda (si aplica)(0 sino)
        List<Float> resultado = new ArrayList<>();


        switch (distribucion.intValue()) { // Convertimos a entero para usar en el switch
            case 1: // Distribución uniforme (Ejemplo para probar http://localhost:8080/api/muestra/1000,1,10,20,0,0,0)
                resultado = Generadores.generadorUniforme(muestra.intValue(), a, b);
                break;
            case 2: // Distribución exponencial (Ejemplo para probar http://localhost:8080/api/muestra/1000,2,0,0,0,0,1)
                resultado = Generadores.generadorExponencial(muestra, lambda);
                break;
            case 3: // Distribución normal
                resultado = Generadores.generadorNormal(muestra, media, desviacion);
                break;
            default: // Opción no válida
                throw new IllegalArgumentException("Opción no válida. Selecciona 1, 2 o 3.");
        }

        // Devolvemos el resultado generado por el generador correspondiente
        return ResponseEntity.ok(resultado);
    }

}
