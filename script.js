document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("questionnaireForm")
  const steps = Array.from(document.querySelectorAll(".step"))
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const saveBtn = document.getElementById("saveBtn")
  const submitBtn = document.getElementById("submitBtn")
  const progressBar = document.querySelector(".progress")

  let currentStep = 0

  function showStep(step) {
    steps.forEach((s, index) => {
      s.style.display = index === step ? "block" : "none"
    })
    updateProgressBar()
    updateButtons()
  }

  function updateProgressBar() {
    const progress = ((currentStep + 1) / steps.length) * 100
    progressBar.style.width = `${progress}%`
  }

  function updateButtons() {
    prevBtn.style.display = currentStep > 0 ? "inline-block" : "none"
    nextBtn.style.display = currentStep < steps.length - 1 ? "inline-block" : "none"
    submitBtn.style.display = currentStep === steps.length - 1 ? "inline-block" : "none"
  }

  function validateStep() {
    const currentStepElement = steps[currentStep]
    const requiredFields = currentStepElement.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false
        field.classList.add("error")
      } else {
        field.classList.remove("error")
      }
    })

    return isValid
  }

  nextBtn.addEventListener("click", () => {
    if (validateStep()) {
      currentStep++
      showStep(currentStep)
      saveProgress()
    }
  })

  prevBtn.addEventListener("click", () => {
    currentStep--
    showStep(currentStep)
  })

  saveBtn.addEventListener("click", saveProgress)

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (validateStep()) {
      const formData = new FormData(form)
      const data = Object.fromEntries(formData)
      console.log(JSON.stringify(data, null, 2))
      alert("Questionário concluído! Dados exportados para o console.")
    }
  })

  function saveProgress() {
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    localStorage.setItem("questionnaireProgress", JSON.stringify(data))
    alert("Progresso salvo!")
  }

  function loadProgress() {
    const savedData = localStorage.getItem("questionnaireProgress")
    if (savedData) {
      const data = JSON.parse(savedData)
      Object.keys(data).forEach((key) => {
        const field = form.elements[key]
        if (field) {
          if (field.type === "checkbox") {
            field.checked = data[key] === "on"
          } else {
            field.value = data[key]
          }
        }
      })
    }
  }

  // Conditional fields
  const nivelPersuasao = document.getElementById("nivel_persuasao")
  const condicionalPersuasao = document.querySelector('.step[data-step="3"] .checkbox-group')

  nivelPersuasao.addEventListener("change", function () {
    condicionalPersuasao.style.display = ["medio", "alto"].includes(this.value) ? "block" : "none"
  })

  // Initialize
  showStep(currentStep)
  loadProgress()
})

