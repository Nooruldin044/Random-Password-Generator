import React, { useState, useCallback, useEffect, useRef } from 'react'

function PasswordGenerator() {
    const [length, setLength] = useState(12)
    const [number, setNumber] = useState(true)
    const [charAllowed, setCharAllowed] = useState(true)
    const [password, setPassword] = useState("")
    const [copied, setCopied] = useState(false)

    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (number) str += "0123456789"
        if (charAllowed) str += "!@#$%^&*{}[]~`_-"

        for (let i = 0; i < length; i++) {
            const charIndex = Math.floor(Math.random() * str.length)
            pass += str.charAt(charIndex)
        }
        setPassword(pass)
        setCopied(false)
    }, [length, number, charAllowed])

    const copyPasswordToClip = useCallback(() => {
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [password])

    useEffect(() => {
        passwordGenerator()
    }, [length, number, charAllowed, passwordGenerator])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-white mb-2">Password Generator</h1>
                    <p className="text-gray-400 text-sm">Create strong and secure passwords</p>
                </div>

                {/* Password Display */}
                <div className="mb-6">
                    <div className="flex items-center bg-gray-700 rounded-lg p-1">
                        <input
                            type="text"
                            value={password}
                            className="w-full bg-transparent border-none outline-none px-4 py-3 text-white text-lg"
                            placeholder="Your password will appear here"
                            readOnly
                            ref={passwordRef}
                        />
                        <button
                            onClick={copyPasswordToClip}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap ml-2"
                        >
                            {copied ? '✓ Copied' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    {/* Length Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-white font-medium">Password Length</label>
                            <span className="text-blue-400 font-bold">{length}</span>
                        </div>
                        <input
                            type="range"
                            min={6}
                            max={32}
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={number}
                                onChange={() => setNumber(!number)}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-white">Include Numbers</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={charAllowed}
                                onChange={() => setCharAllowed(!charAllowed)}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-white">Special Characters</span>
                        </label>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={passwordGenerator}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                        Generate New Password
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PasswordGenerator