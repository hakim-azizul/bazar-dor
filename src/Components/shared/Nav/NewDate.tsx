import { connection } from 'next/server'
import { Suspense } from 'react'
import { format } from 'date-fns'
import { bn } from 'date-fns/locale'
import { tz } from '@date-fns/tz'

const toBn = (s: string) => s.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])

async function CurrentDate() {
  await connection()
  const text = toBn(format(new Date(), 'd MMMM yyyy', { locale: bn, in: tz('Asia/Dhaka') }))
  return <p>{text}</p>
}

export default function NewDate() {
  return (
    <Suspense fallback={<p>...</p>}>
      <CurrentDate />
    </Suspense>
  )
}