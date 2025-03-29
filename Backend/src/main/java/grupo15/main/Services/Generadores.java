package grupo15.main.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Generadores {

            public static List<Float> generadorUniforme(float muestra, float a, float b) {
                List<Float> numerosUniformes = new ArrayList<>();
                Random random = new Random('1');

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
                Random random = new Random('1');

                for (int i = 0; i < muestra; i++) {
                    float numeroAleatorio = random.nextFloat(); // Número aleatorio entre 0 y 1
                    float numeroTransformado = (float) (-Math.log(1 - numeroAleatorio) / lambda); // Transformación a distribucion exponencial

                    // Redondear a 4 decimales
                    float numeroRedondeado = Math.round(numeroTransformado * 10000f) / 10000f;
                    numerosUniformes.add(numeroRedondeado);
                }
                return numerosUniformes;
            }

            public static List<Float> generadorNormal(float muestra, float desviacion, float media){
                List<Float> numerosUniformes = new ArrayList<>();
                Random random = new Random('1');

                for (int i = 0; i < muestra; i++) {
                    float numeroAleatorio = random.nextFloat(); // Número aleatorio entre 0 y 1
                    float numeroTransformado = (float) ; // Transformación a distribucion normal

                    // Redondear a 4 decimales
                    float numeroRedondeado = Math.round(numeroTransformado * 10000f) / 10000f;
                    numerosUniformes.add(numeroRedondeado);
                }
                return numerosUniformes;
            }
}

