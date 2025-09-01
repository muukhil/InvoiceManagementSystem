import React from 'react'
import "../CSS/Home.css"
import Item from './Items'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="store">
        <Item 
            name="HP Mouse"
            image="../img/item_hp_mouse.jpg"
            description="
            USB-A Nano Dongle, 2.4 Ghz Wireless Connection, 6 Buttons, Up to 1600 Dpi, Optical Sensor, Ergonomic Design, 12-Month Battery Life, 3-Year Warranty, 60G±5%, Black, 7J4G4Aa
            "
            price={499}
            />
        <Item
            name="ZEBRONICS Transformer-M"
            image="../img/item_gaming_mouse.jpg"
            description="High-Performance Gold-Plated USB Mouse: 6 Buttons, Multi-Color LED Lights,High-Resolution Sensor with max 3600 DPI, and DPI Switch(Black)"
            price={299}
            />
        <Item
            name="ZEBRONICS Transformer-M"
            image="../img/item_gaming_mouse.jpg"
            description="High-Performance Gold-Plated USB Mouse: 6 Buttons, Multi-Color LED Lights,High-Resolution Sensor with max 3600 DPI, and DPI Switch(Black)"
            price={299}
            />
        <Item
            name="ZEBRONICS Transformer-M"
            image="../img/item_gaming_mouse.jpg"
            description="High-Performance Gold-Plated USB Mouse: 6 Buttons, Multi-Color LED Lights,High-Resolution Sensor with max 3600 DPI, and DPI Switch(Black)"
            price={299}
            />
        <Item
            name="ZEBRONICS Transformer-M"
            image="../img/item_gaming_mouse.jpg"
            description="High-Performance Gold-Plated USB Mouse: 6 Buttons, Multi-Color LED Lights,High-Resolution Sensor with max 3600 DPI, and DPI Switch(Black)"
            price={299}
            />
        <Item
            name="ZEBRONICS Transformer-M"
            image="../img/item_gaming_mouse.jpg"
            description="High-Performance Gold-Plated USB Mouse: 6 Buttons, Multi-Color LED Lights,High-Resolution Sensor with max 3600 DPI, and DPI Switch(Black)"
            price={299}
            />
    </div>
    </>
  )
}

export default Home