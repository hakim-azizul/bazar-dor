"use client";

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { tz } from '@date-fns/tz';

const toBn = (s: string) => s.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]);

export default function NewDate() {
  const [dateText, setDateText] = useState<string>('...');

  useEffect(() => {

    const text = toBn(format(new Date(), 'd MMMM yyyy', { locale: bn, in: tz('Asia/Dhaka') }));
    // eslint-disable-next-line
    setDateText(text);
  }, []);

  return <>{dateText}</>;
}