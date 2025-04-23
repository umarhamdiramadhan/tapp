import { formatRupiah } from "../../utils/format-rupiah"

export type CheckSaldoH2h = {
    memberid:string,
    pin:string,
    password:string
    ip:string
}



export function toCheckSaldoH2h(memberId:string,saldo:number,pemakaian:number):string{
  const convertRupiahSaldo = formatRupiah(saldo)
  const convertRupiahPemakaian = formatRupiah(saldo)
  return `Yth MemberId ${memberId} sisa saldo anda ${convertRupiahSaldo} dan pemaikan saldo hari ini ${convertRupiahPemakaian}`
    
}