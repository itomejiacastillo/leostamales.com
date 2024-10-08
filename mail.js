

class footer_english extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback() {
        this.innerHTML = `<footer class="py-8 bg-lime-50">
        <hr class="h-px lg:max-w-5xl lg:mx-auto  bg-green-700 mx-4 border-0 mb-7">
        <img data-aos="zoom-in" data-aos-delay="200" data-aos-duration="500" title="Leos Tamales logo" alt="Leos Tamales logo" class="w-64 mx-auto" src="multimedia/vectores/LOGO HORIZONTAL.svg" width="256px" alt="">
        <div class="py-8 px-3 w-full md:max-w-screen-md md:m-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 lg:gap-10">
            <div>
                <h4 class="text-xl font-bold">Contact</h4>
                <ul class="mb-7">
                    <li class="my-3"><a title="Instagram @leostamales22" class="py-2 text-md" href="https://www.instagram.com/leostamales22"><img title="Instagram logo" alt="Instagram logo" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/instagram.svg" alt="">Instagram</a></li>
                    <li class="my-3"><a title="Facebook @leostamales" class="py-2 text-md" href="https://www.facebook.com/leostamales"><img title="Facebook logo" alt="Facebook logo" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/facebook.svg" alt="">Facebook</a></li>
                    <li class="my-3"><a title="WhatsApp +1 323 787 7575" class="py-2 text-md" href="https://wa.me/+13237877575"><img title="WhatsApp logo" alt="WhatsApp logo" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/whatsapp.svg" alt="">WhatsApp</a></li>
                    <li class="my-3"><a title="Telephone +1 323 787 7575" class="py-2 text-md" href="tel:+13237877575"><img title="Telephone icon" alt="Telephone icon" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/telefono.svg" alt="">Telephone</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-xl font-bold">Payments</h4>
                <ul class="mb-7">
                    <li class="my-3"><img title="Cash icon" alt="Cash icon" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/efectivo.svg" alt="">Cash</li>
                    <li class="my-3"><a title="Pay with zelle" class="py-2 text-md" href="tel:+13237877575"><img title="Zelle logo" alt="Zelle icon" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/zelle.svg" alt="">Zelle</a></li>
                    <li class="my-3"><a title="Pay with venmo" class="py-2 text-md" href="https://venmo.com/code?user_id=2775643343290368689&created=1624065168"><img title="Venmo logo" alt="Venmo icon" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/venmo.svg" alt="">Venmo</a></li>
                    
                </ul>
            </div>
            <div>
                <h4 class="text-xl font-bold">Legal</h4>
                <ul>
                    <li class="my-3 ml-1"><a href="/">Privacy Policy</a></li>
                    <li class="my-3 ml-1"><a href="/">Terms & Conditions</a></li>
                    <li class="my-3 ml-1"><a href="/">About</a></li>
                </ul>
            </div>
        </div>
        <p class="text-center">© 2023 Leo's Tamales. All Rights Reserved.</p>
        
      </footer>`
    }
}
window.customElements.define("footer-english", footer_english);


class footer_spanish extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback() {
        this.innerHTML = `<footer class="py-8 bg-lime-50">
        <hr class="h-px lg:max-w-5xl lg:mx-auto  bg-green-700 mx-4 border-0 mb-7">
        <img data-aos="zoom-in" data-aos-delay="200" data-aos-duration="500" title="Leos Tamales logo" alt="Leos Tamales logo" class="w-64 mx-auto" src="../multimedia/vectores/LOGO HORIZONTAL.svg" width="256px" alt="">
        <div class="py-8 px-3 w-full md:max-w-screen-md md:m-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 lg:gap-10">
            <div>
                <h4 class="text-xl font-bold">Contacto</h4>
                <ul class="mb-7">
                    <li class="my-3"><a title="Instagram @leostamales22" class="py-2 text-md" href="https://www.instagram.com/leostamales22"><img title="Instagram logo" alt="Instagram logo" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/instagram.svg" alt="">Instagram</a></li>
                    <li class="my-3"><a title="Facebook @leostamales" class="py-2 text-md" href="https://www.facebook.com/leostamales"><img title="Facebook logo" alt="Facebook logo" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/facebook.svg" alt="">Facebook</a></li>
                    <li class="my-3"><a title="WhatsApp +1 323 787 7575" class="py-2 text-md" href="https://wa.me/+13237877575"><img title="WhatsApp logo" alt="WhatsApp logo" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/whatsapp.svg" alt="">WhatsApp</a></li>
                    <li class="my-3"><a title="Telephone +1 323 787 7575" class="py-2 text-md" href="tel:+13237877575"><img title="Telephone icon" alt="Telephone icon" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/telefono.svg" alt="">Telephone</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-xl font-bold">Medios de Pago</h4>
                <ul class="mb-7">
                    <li class="my-3"><img title="Cash icon" alt="Cash icon" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/efectivo.svg" alt="">Efectivo</li>
                    <li class="my-3"><a title="Pay with zelle" class="py-2 text-md" href="tel:+13237877575"><img title="Zelle logo" alt="Zelle icon" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/zelle.svg" alt="">Zelle</a></li>
                    <li class="my-3"><a title="Pay with venmo" class="py-2 text-md" href="https://venmo.com/code?user_id=2775643343290368689&created=1624065168"><img title="Venmo logo" alt="Venmo icon" class="w-6 h-6 mx-2 inline-flex" src="../multimedia/vectores/venmo.svg" alt="">Venmo</a></li>
                    
                </ul>
            </div>
            <div>
                <h4 class="text-xl font-bold">Legal</h4>
                <ul>
                    <li class="my-3 ml-1"><a href="/es/politica-de-privacidad.html">Politica de Privacidad</a></li>
                    <li class="my-3 ml-1"><a href="/es/">Términos y Condiciones</a></li>
                    <li class="my-3 ml-1"><a href="/es/">Acerca de</a></li>
                </ul>
            </div>
        </div>
        <p class="text-center">© 2023 Leo's Tamales. Todos los derechos reservados.</p>
        
      </footer>`
    }
}
window.customElements.define("footer-spanish", footer_spanish);



class nav_english extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback() {
        this.innerHTML = `    <span id="Inicio"></span>
        <nav class="sticky top-0 px-4 py-4 flex justify-between items-center bg-white z-50">
            <a title="Leos Tamales Inicio"  class="text-3xl font-bold leading-none" href="/">
                <img title="Leos Tamales Logo" class="h-10" src="multimedia/vectores/LOGO HORIZONTAL.svg" alt="Leos Tamales logo">
            </a>
            <div class="lg:hidden">
                <button title="boton" type="button" class="navbar-burger flex items-center text-green-600 p-2">
                    <svg class="block h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Mobile menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>
            </div>
            <ul class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                <li><a class="text-m text-orange-900 hover:text-gray-500" href="/#Inicio">Start</a></li>
                
                <li><a class="text-m text-orange-900 font-bold" href="/#Menu">Menu</a></li>
                
                <li><a class="text-m text-orange-900 hover:text-gray-500" href="/#Precios">Prices</a></li>
                
                <li><a class="text-m text-orange-900 hover:text-gray-500" href="/#Contact">Contact us</a></li>
                
                <li><a class="text-m text-orange-900 hover:text-gray-500" href="/#Delivery">Delivery</a></li>
            </ul>
            
            <a class="hidden lg:flex lg:flex-row lg:gap-3 lg:align-center lg:justify-center py-2 px-6 bg-green-500 hover:bg-green-600 text-m text-white font-bold rounded-xl transition duration-200" href="tel:+13237877575">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                Order Now
            </a>
        </nav>
        <div class="navbar-menu relative z-50 hidden">
            <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                <div class="flex items-center mb-8">
                    <a title="Leos Tamales Inicio" class="mr-auto text-3xl font-bold leading-none" href="index.html">
                        <img title="Leos Tamales Logo" class="w-16 h-16" src="../multimedia/vectores/LOGO VERTICAL.svg" alt="Leos Tamales Logo">
                        
                    </a>
                    <button title="Cerrar barra de navegacion" type="button" class="navbar-close">
                        <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    <ul>
                        <li class="mb-1">
                            <a title="Start" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/#Inicio">Start</a>
                        </li>
                        <li class="mb-1">
                            <a title="Menu" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/#Menu">Menu</a>
                        </li>
                        <li class="mb-1">
                            <a title="Prices" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/#Precios">Prices</a>
                        </li>
                        <li class="mb-1">
                            <a title="Contact Us" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/#Contact">Contact us</a>
                        </li>
                        <li class="mb-1">
                            <a title="Delivery" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/#Delivery">Delivery</a>
                        </li>
                    </ul>
                </div>
                <div class="mt-auto">
                    <p class="text-sm font-semibold text-gray-400 my-4">Share this website trough:</p>
                    <a title="Whatsapp" class="inline-block w-11 p-2 h-11 bg-green-400 rounded-full" href="https://api.whatsapp.com/send?text=Visita%20www.leostamales.com%20y%20mira%20nuestro%20menu%20de%20tamales%20mexicanos%20y%20champurrado.%20Haz%20tus%20pedidos%20con%20nosotros%20hoy%20mismo.">
                        <svg class="w-full h-full mr-2 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                              d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                              ></path>
                        </svg>
                    </a>
                    <a title="facebook" class="inline-block w-11 p-2 pb-0 pl-3 h-11 bg-blue-600 rounded-full" href="https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https%3A%2F%2Fleostamales.com%2F">
                        <svg class="w-full h-full mr-2 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                        </svg>
                    </a>
                    <a title="twitter" class="inline-block w-11 h-11 p-2 rounded-full bg-blue-500" href="https://twitter.com/intent/tweet?text=Visita%20https%3A%2F%2Fleostamales.com%2F%20ahora%20mismo%20y%20mira%20los%20deliciosos%20tamales%20mexicanos%20que%20ofrece%20Leos%20Tamales.">
                        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                  ></path>
                          </svg>
                    </a>
                    <a title="Telegram" class="inline-block w-11 h-11 p-2 rounded-full bg-blue-500" href="https://t.me/share/url?url=https%3A%2F%2Fleostamales.com&text=Visita%20Leos%20Tamales%20ahora%20mismo%20y%20mira%20los%20deliciosos%20tamales%20mexicanos%20que%20ofrece.">
                        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                        d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"
                        ></path>
                          </svg>
                    </a>
                    
                </div>
            </nav>
        </div>`
    }
}
window.customElements.define("nav-english", nav_english);


class nav_spanish extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback() {
        this.innerHTML = `<span id="Inicio"></span>
        <nav class="sticky top-0 px-4 py-4 flex justify-between items-center bg-white z-50">
            <a title="Leos Tamales Inicio"  class="text-3xl font-bold leading-none" href="/es/">
                <img title="Leos Tamales Logo" class="h-10" src="../multimedia/vectores/LOGO HORIZONTAL.svg" alt="Leos Tamales logo">
            </a>
            <div class="lg:hidden">
                <button title="boton" type="button" class="navbar-burger flex items-center text-green-600 p-2">
                    <svg class="block h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Mobile menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>
            </div>
            <ul class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                <li><a class="text-m text-orange-900 hover:text-gray-500" href="/es/#Inicio">Inicio</a></li>
                
                <li><a class="text-m text-orange-900 font-bold" href="/es/#Menu">Menú</a></li>
                
                <li><a class="text-m text-orange-900 hover:text-gray-500" href="/es/#Precios">Precios</a></li>
                
                <li><a class="text-m text-orange-900 hover:text-gray-500" href="/es/#Contact">Contacto</a></li>
                
                <li><a class="text-m text-orange-900 hover:text-gray-500" href="/es/#Delivery">Delivery</a></li>
            </ul>
            
            <a class="hidden lg:flex lg:flex-row lg:gap-3 lg:align-center lg:justify-center py-2 px-6 bg-green-500 hover:bg-green-600 text-m text-white font-bold rounded-xl transition duration-200" href="tel:+13237877575">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                Ordenar ahora
            </a>
        </nav>
        <div class="navbar-menu relative z-50 hidden">
            <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                <div class="flex items-center mb-8">
                    <a title="Leos Tamales Inicio" class="mr-auto text-3xl font-bold leading-none" href="index.html">
                        <img title="Leos Tamales Logo" class="w-16 h-16" src="../multimedia/vectores/LOGO VERTICAL.svg" alt="Leos Tamales Logo">
                        
                    </a>
                    <button title="Cerrar barra de navegacion" type="button" class="navbar-close">
                        <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    <ul>
                        <li class="mb-1">
                            <a title="Start" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/es/#Inicio">Inicio</a>
                        </li>
                        <li class="mb-1">
                            <a title="Menu" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/es/#Menu">Menú</a>
                        </li>
                        <li class="mb-1">
                            <a title="Prices" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/es/#Precios">Precios</a>
                        </li>
                        <li class="mb-1">
                            <a title="Contact Us" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/es/#Contact">Contacto</a>
                        </li>
                        <li class="mb-1">
                            <a title="Delivery" class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-black rounded" href="/es/#Delivery">Delivery</a>
                        </li>
                    </ul>
                </div>
                <div class="mt-auto">
                    <p class="text-sm font-semibold text-gray-400 my-4">Comparte este sitio a través de:</p>
                    <a title="Whatsapp" class="inline-block w-11 p-2 h-11 bg-green-400 rounded-full" href="https://api.whatsapp.com/send?text=Visita%20www.leostamales.com%20y%20mira%20nuestro%20menu%20de%20tamales%20mexicanos%20y%20champurrado.%20Haz%20tus%20pedidos%20con%20nosotros%20hoy%20mismo.">
                        <svg class="w-full h-full mr-2 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                              d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                              ></path>
                        </svg>
                    </a>
                    <a title="facebook" class="inline-block w-11 p-2 pb-0 pl-3 h-11 bg-blue-600 rounded-full" href="https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https%3A%2F%2Fleostamales.com%2F">
                        <svg class="w-full h-full mr-2 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                        </svg>
                    </a>
                    <a title="twitter" class="inline-block w-11 h-11 p-2 rounded-full bg-blue-500" href="https://twitter.com/intent/tweet?text=Visita%20https%3A%2F%2Fleostamales.com%2F%20ahora%20mismo%20y%20mira%20los%20deliciosos%20tamales%20mexicanos%20que%20ofrece%20Leos%20Tamales.">
                        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                  ></path>
                          </svg>
                    </a>
                    <a title="Telegram" class="inline-block w-11 h-11 p-2 rounded-full bg-blue-500" href="https://t.me/share/url?url=https%3A%2F%2Fleostamales.com&text=Visita%20Leos%20Tamales%20ahora%20mismo%20y%20mira%20los%20deliciosos%20tamales%20mexicanos%20que%20ofrece.">
                        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                        d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"
                        ></path>
                          </svg>
                    </a>
                    
                </div>
            </nav>
        </div>`
    }
}
window.customElements.define("nav-spanish", nav_spanish);







 // Burger menus
 document.addEventListener('DOMContentLoaded', function() {
    // open
    const burger = document.querySelectorAll('.navbar-burger');
    const menu = document.querySelectorAll('.navbar-menu');

    if (burger.length && menu.length) {
        for (var i = 0; i < burger.length; i++) {
            burger[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }

    // close
    const close = document.querySelectorAll('.navbar-close');
    const backdrop = document.querySelectorAll('.navbar-backdrop');

    if (close.length) {
        for (var i = 0; i < close.length; i++) {
            close[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }

    if (backdrop.length) {
        for (var i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }
});


function hidediv() {
    var x = document.getElementById("hide");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


  function goBack() {
    if (document.referrer) {
        window.history.back();  // Vuelve a la página anterior
    } else {
        window.location.href = "/";  // Si no hay página anterior, redirige al inicio
    }
}
