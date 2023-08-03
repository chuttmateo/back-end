package com.grupo2.backend;

import java.util.Objects;

public class Curso {
    private String nombre;
    private Double valor;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Curso(String nombre, Double valor) {
        this.nombre = nombre;
        this.valor = valor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Curso curso = (Curso) o;
        return Objects.equals(nombre, curso.nombre) && Objects.equals(valor, curso.valor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nombre, valor);
    }

    @Override
    public String toString() {
        return "Curso{" +
                "nombre='" + nombre + '\'' +
                ", valor=" + valor +
                '}';
    }
}
