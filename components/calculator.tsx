'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [stack, setStack] = useState<number[]>([])
  const [financialRegisters, setFinancialRegisters] = useState({
    n: 0,    // Number of periods
    i: 0,    // Interest rate (as percentage)
    pv: 0,   // Present Value
    pmt: 0,  // Payment
    fv: 0    // Future Value
  })
  const [inputMode, setInputMode] = useState<keyof typeof financialRegisters | null>(null)

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num)
  }

  const handleEnter = () => {
    setStack(prev => [parseFloat(display), ...prev])
    if (inputMode) {
      setFinancialRegisters(prev => ({
        ...prev,
        [inputMode]: parseFloat(display)
      }))
      setInputMode(null)
    }
    setDisplay('0')
  }

  const handleOperation = (op: string) => {
    const x = parseFloat(display)
    const y = stack[0] || 0
    let result = 0

    switch (op) {
      case '+':
        result = y + x
        break
      case '-':
        result = y - x
        break
      case '×':
        result = y * x
        break
      case '÷':
        result = y / x
        break
    }

    setStack(prev => prev.slice(1))
    setDisplay(result.toString())
  }

  const calculatePV = () => {
    const { n, i, pmt, fv } = financialRegisters
    
    // Convert annual interest rate to decimal
    const r = i / 100 / 12  // Assuming monthly payments
    
    try {
      if (r === 0) {
        // Simple calculation when interest rate is 0
        const pv = -fv - (pmt * n)
        setDisplay(pv.toFixed(2))
        return
      }

      // Standard PV formula for compound interest
      const pvFV = fv / Math.pow(1 + r, n)
      const pvPMT = pmt * ((1 - Math.pow(1 + r, -n)) / r)
      const pv = -(pvFV + pvPMT)
      
      setDisplay(pv.toFixed(2))
      setFinancialRegisters(prev => ({
        ...prev,
        pv: pv
      }))
  //  }  
  
  } catch (error) {

    const text: string = (error as string);

    setDisplay(text)

  }
  
  
  }

  const handleFinancial = (register: keyof typeof financialRegisters) => {
    if (register === 'pv') {
      calculatePV()
    } else {
      setInputMode(register)
      setFinancialRegisters(prev => ({
        ...prev,
        [register]: parseFloat(display)
      }))
      setDisplay('0')
    }
  }

  return (
    <div className="w-[800px] p-4 bg-neutral-200 rounded-lg shadow-xl">
      {/* Top bezel with display and HP logo */}
      <div className="bg-[#D4AF37] p-4 mb-4 rounded-t-lg relative">
        <div className="bg-[#c0c7c1] w-3/4 mx-auto p-2 font-mono text-right text-xl border-2 border-neutral-300">
          {display}
        </div>
        <div className="absolute top-2 right-4 text-black font-bold text-lg">
          HP
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-10 gap-1">
        {/* Row 1 */}
        <Button
          variant="outline"
          className="bg-neutral-800 text-orange-500 hover:text-orange-400"
          onClick={() => handleFinancial('n')}
        >
          n
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-orange-500 hover:text-orange-400"
          onClick={() => handleFinancial('i')}
        >
          i
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-blue-400 hover:text-blue-300"
          onClick={() => handleFinancial('pv')}
        >
          PV
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-blue-400 hover:text-blue-300"
          onClick={() => handleFinancial('pmt')}
        >
          PMT
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-blue-400 hover:text-blue-300"
          onClick={() => handleFinancial('fv')}
        >
          FV
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          CHS
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('7')}
        >
          7
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('8')}
        >
          8
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('9')}
        >
          9
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleOperation('÷')}
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button variant="outline" className="bg-neutral-800 text-white">
          y^x
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          1/x
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          %T
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          Δ%
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          %
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          EEX
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('4')}
        >
          4
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('5')}
        >
          5
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('6')}
        >
          6
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleOperation('×')}
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button variant="outline" className="bg-neutral-800 text-white">
          PRICE
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          YTM
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          SL
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          DEPR
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          DB
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          R↓
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('1')}
        >
          1
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('2')}
        >
          2
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('3')}
        >
          3
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleOperation('-')}
        >
          -
        </Button>

        {/* Row 4 */}
        <Button variant="outline" className="bg-neutral-800 text-white">
          P/R
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          Σ+
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          PRGM
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          x≂y
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          CLx
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white col-span-3" onClick={handleEnter}>
          ENTER
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('0')}
        >
          0
        </Button>
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleOperation('+')}
        >
          +
        </Button>

        {/* Row 5 */}
        <Button variant="outline" className="bg-neutral-800 text-white">
          ON
        </Button>
        <Button variant="outline" className="bg-[#d4804d] text-white">
          f
        </Button>
        <Button variant="outline" className="bg-[#4d8b9e] text-white">
          g
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          STO
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          RCL
        </Button>
        <div className="col-span-3" />
        <Button
          variant="outline"
          className="bg-neutral-800 text-white"
          onClick={() => handleNumber('.')}
        >
          .
        </Button>
        <Button variant="outline" className="bg-neutral-800 text-white">
          Σ-
        </Button>
      </div>
    </div>
  )
}