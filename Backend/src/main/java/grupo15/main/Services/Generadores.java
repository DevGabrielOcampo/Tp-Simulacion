package grupo15.main.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Generadores {

    public static List<Float> generadorUniforme(float muestra, float a, float b) {
        List<Float> numerosUniformes = new ArrayList();
        Random random = new Random(); // Usaba seed 1

        for (int i = 0; i < muestra; i++) {
            float numeroAleatorio = random.nextFloat(); // Número aleatorio entre 0 y 1
            float numeroTransformado = numeroAleatorio * (b - a) + a; // Transformación al intervalo [a, b)

            // Redondear a 4 decimales
            float numeroRedondeado = Math.round(numeroTransformado * 10000f) / 10000f;
            numerosUniformes.add(numeroRedondeado);
        }

        return numerosUniformes;
    }

    public static List<Float> generadorExponencial(float muestra, float lambda){
        List<Float> numerosUniformes = new ArrayList<>();
        Random random = new Random();// Usaba seed 7

        for (int i = 0; i < muestra; i++) {
            float numeroAleatorio = random.nextFloat(); // Número aleatorio entre 0 y 1
            float numeroTransformado = (float) (-Math.log(1 - numeroAleatorio) / lambda); // Transformación a distribucion exponencial

            // Redondear a 4 decimales
            float numeroRedondeado = Math.round(numeroTransformado * 10000f) / 10000f;
            numerosUniformes.add(numeroRedondeado);
        }
        return numerosUniformes;
    }



    public static List<Float> generadorNormal(float cantidad, float media, float desviacion) {
        List<Float> muestra = new ArrayList<>();
        Random random = new Random(); // Usaba seed 10
        float PI = (float) Math.PI;

        // Generar el primer par de números aleatorios
        float u1 = random.nextFloat();
        if (u1 == 0.0f) u1 = 0.000001f; // Evitar u1 = 0
        float u2 = random.nextFloat();

        float i = 0.0f;
        while (i < cantidad) {
            // Generar los números con la fórmula de Box-Muller
            float n1 = (float) Math.sqrt(-2.0f * Math.log(u1)) * (float) Math.cos(2.0f * PI * u2) * desviacion + media;
            float n2 = (float) Math.sqrt(-2.0f * Math.log(u1)) * (float) Math.sin(2.0f * PI * u2) * desviacion + media;

            // Redondear a 4 decimales
            n1 = (float) (Math.round(n1 * 10000.0f) / 10000.0f);
            n2 = (float) (Math.round(n2 * 10000.0f) / 10000.0f);

            // Agregar el primer número
            muestra.add(n1);
            i += 1.0f;

            // Antes de agregar el segundo número, verificar si se ha alcanzado la cantidad deseada
            if (i < cantidad) {
                muestra.add(n2);
                i += 1.0f;
            }

            // Actualizar u1 y generar nuevo u2 para la siguiente iteración
            u1 = u2;
            u2 = random.nextFloat();
        }

        return muestra;
    }

}


