export interface Nota {
    idNota?: number | string,
    titulo: string,
    descripcion: string,
    created_at?: string,
    idUsuario?: string | number
}