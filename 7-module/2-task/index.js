import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = this.render();
    this.addEventListener();
    this.closeKeyDown();
  }
  render() {
    this.modal = createElement(
      `<div class="container">
<!--Корневой элемент Modal-->
<div class="modal">
<!--Прозрачная подложка перекрывающая интерфейс-->
<div class="modal__overlay"></div>

<div class="modal__inner">
  <div class="modal__header">
    <!--Кнопка закрытия модального окна-->
    <button type="button" class="modal__close">
      <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
    </button>

    <h3 class="modal__title">
      Вот сюда нужно добавлять заголовок
    </h3>
  </div>

  <div class="modal__body">
    A сюда нужно добавлять содержимое тела модального окна
  </div>
</div>

</div>
</div>`
    );

    return this.modal;
  }
  addEventListener() {
    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".modal__close")) {
        this.close();
        document.onkeydown = null;
      }
    });
  }
  open() {
    document.body.insertAdjacentElement("beforeEnd", this.elem);
    document.body.classList.add("is-modal-open");
  }
  setTitle(modalTitle) {
    this.elem.querySelector(".modal__title").innerHTML = modalTitle;
  }
  setBody(node) {
    this.elem.querySelector(".modal__body").innerHTML = node.outerHTML;
  }
  close() {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
    document.onkeydown = null;
  }
  closeKeyDown(event) {
    document.onkeydown = (event) => {
      if (event.code === "Escape") {
        
        this.close();
        document.onkeydown = null;
      }
    };
  }
}





// export default class Modal {
//   constructor() {
//     this.modal = createElement(
//       `<div class="container">
//   <!--Корневой элемент Modal-->
//   <div class="modal">
//     <!--Прозрачная подложка перекрывающая интерфейс-->
//     <div class="modal__overlay"></div>

//     <div class="modal__inner">
//       <div class="modal__header">
//         <!--Кнопка закрытия модального окна-->
//         <button type="button" class="modal__close">
//           <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
//         </button>

//         <h3 class="modal__title">
//           Вот сюда нужно добавлять заголовок
//         </h3>
//       </div>

//       <div class="modal__body">
//         A сюда нужно добавлять содержимое тела модального окна
//       </div>
//     </div>

//   </div>
// </div>`
//     );
//     this.modal.addEventListener("click", (event) => {
//       if (event.target.closest(".modal__close")) {
//         this.close();
//         document.onkeydown = null;
//       }
//     });

//     document.onkeydown = (event) => {
//       if (event.code === "Escape") {
        
//         this.close();
//         document.onkeydown = null;
//       }
//     };
//   }
//   open() {
//     document.body.insertAdjacentElement("beforeEnd", this.modal);
//     document.body.classList.add("is-modal-open");
//   }
//   setTitle(modalTitle) {
//     this.modal.querySelector(".modal__title").innerHTML = modalTitle;
//   }
//   setBody(node) {
//     this.modal.querySelector(".modal__body").innerHTML = node.outerHTML;
//   }
//   close() {
//     document.body.classList.remove("is-modal-open");
//     this.modal.remove();
//     document.onkeydown = null;
//   }
//   closeKeyDown(event){
    

//   }
// }
