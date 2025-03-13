class themeSwitcher{
selectors = {
    switchThemeButton: '[data-js-theme-switcher]', //хранится селектор по аттребуту
}

theme = {
    dark:'dark',
    light:'light',
}

stateClasses = {
    isDarkTheme: 'is-dark-theme'
}

storageKey = 'theme'

constructor() {
    this.switchThemeButtonElement = document.querySelector(this.selectors.switchThemeButton);
    this.setInitialTheme() // при инициализации класса надо установить начальную тему по данным из localStorage
    this.bindEvents() // привязать событие
}

get isDarkThemeCached(){ //геттер, позволяет обращатся к методу как к св-ву без ()
 return localStorage.getItem(this.storageKey) === this.theme.dark  // хранит буллевое значение была ли в кеше темная тема
}

setInitialTheme(){
    // проверка хранятся ли в кеше данные о теме
   
    document.documentElement.classList.toggle(
        this.stateClasses.isDarkTheme,
        this.isDarkThemeCached
    ) // методом toggle передали буллевое значение
}

// this.onClick - чтобы так передавать функции она должна быть стрелочной

onClick = () => {
//сохранение темы в localstorage
  localStorage.setItem(
    this.storageKey,
    this.isDarkThemeCached ? this.theme.light : this.theme.dark // если в this.isDarkThemeCached то устанавливаем противоположную тему, если нет то темную
  )

  //удаляем класс темной темы у html
  document.documentElement.classList.toggle(this.stateClasses.isDarkTheme)

}

bindEvents(){
    this.switchThemeButtonElement.addEventListener('click',this.onClick, )
}
}

new themeSwitcher() //вызов класса