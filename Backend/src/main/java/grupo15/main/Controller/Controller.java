package grupo15.main.Controller;

import grupo15.main.Services.Generadores;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class Controller {
    @GetMapping("/muestra/{datos}")
    // Recibe 4 floats, el primer representa la muestra, el segundo la distribucion, el tercero y cuarto los intervalos [A, B]
    // el quinto desviacion, el sexto media, el septimo lambda
    public ResponseEntity<List<Float>> recibirNumero(@PathVariable List<Float> datos) {
        Float muestra = datos.get(0);     // Cantidad de números a generar
        Float distribucion = datos.get(1); // Tipo de distribución
        Float a = datos.get(2);          // Límite inferior del intervalo
        Float b = datos.get(3);          // Límite superior del intervalo
        Float desviacion = datos.get(4); // Desviación estándar (si aplica)
        Float media = datos.get(5);      // Media (si aplica)
        Float lambda = datos.get(6);     // Parámetro lambda (si aplica)
        List<Float> resultado = new ArrayList<>();


        switch (distribucion.intValue()) { // Convertimos a entero para usar en el switch
            case 1: // Distribución uniforme
                resultado = Generadores.generadorUniforme(muestra.intValue(), a, b);
                break;
            case 2: // Distribución exponencial (debes implementar generadorExponencial)
                //resultado = Generadores.generadorExponencial(muestra.intValue(), lambda);
                break;
            case 3: // Distribución normal (debes implementar generadorNormal)
                //resultado = Generadores.generadorNormal(muestra.intValue(), media, desviacion);
                break;
            default: // Opción no válida
                throw new IllegalArgumentException("Opción no válida. Selecciona 1, 2 o 3.");
        }

        // Devolvemos el resultado generado por el generador correspondiente
        return ResponseEntity.ok(resultado);
    }

}
