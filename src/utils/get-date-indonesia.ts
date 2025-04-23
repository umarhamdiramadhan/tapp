   export function getJakartaDate(dateString?: string): Date {
        // Jika tidak ada dateString, gunakan tanggal saat ini
        const date = dateString 
          ? new Date(dateString) 
          : new Date()
        
        // Konversi ke string ISO untuk menghindari warning
        return new Date(
          date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
        )
      }