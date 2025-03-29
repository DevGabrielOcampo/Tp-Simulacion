package grupo15.main.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Generadores {

            public static List<Float> generadorUniforme(float muestra, float a, float b) {
                List<Float> numerosUniformes = new ArrayList<>();
                Random random = new Random();

                for (int i = 0; i < muestra; i++) {
                    float numeroAleatorio = random.nextFloat(); // Número aleatorio entre 0 y 1
                    float numeroTransformado = numeroAleatorio * (b - a) + a; // Transformación al intervalo [a, b)

                    // Redondear a 4 decimales
                    float numeroRedondeado = Math.round(numeroTransformado * 10000f) / 10000f;
                    numerosUniformes.add(numeroRedondeado);
                }

                return numerosUniformes;
            }
}

