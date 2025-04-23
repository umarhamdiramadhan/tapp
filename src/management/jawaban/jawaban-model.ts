import { Jawaban } from "@prisma/client"

export type JawabanResponse = {
    id:number
    nama_jawaban:string
    kata_kunci:string
    regex:string
    prioritas:number
    generate_sn:string
    is_update:boolean
    status:string
}

enum StatusJawaban{
    sukses,
    gagal,
    dibatalkan,
    gangguan,
    alihkan,
}

export type JawabanCreateRequest = {
    nama_jawaban:string
    kata_kunci:string
    regex:string
    prioritas:number
    generate_sn:string
    is_update:boolean
    status:StatusJawaban
}

export type JawabanUpdateRequest = {
    id:number
    nama_jawaban:string
    kata_kunci:string
    regex:string
    prioritas:number
    generate_sn:string
    is_update:boolean
    status:StatusJawaban
}

export type JawabanViewRequest = {
    nama_jawaban:string
    status:string
    page:number
    size:number
}

export function toJawabanResponse(jawaban:Jawaban):JawabanResponse{
    return{
        id:jawaban.id,
        nama_jawaban:jawaban.nama_jawaban,
        kata_kunci:jawaban.kata_kunci,
        regex:jawaban.regex,
        prioritas:jawaban.prioritas,
        generate_sn:jawaban.generate_sn,
        is_update:jawaban.is_update,
        status:jawaban.status
    }
}