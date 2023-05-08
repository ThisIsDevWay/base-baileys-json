const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const flujoInfoGeneral = addKeyword(['clínica', 'hospital', 'información', 'horarios'])
  .addAnswer('Bienvenido a nuestra clínica. ¿En qué puedo ayudarte?', { delay: 1500 })
  .addAnswer('Nuestros horarios de atención son de lunes a viernes de 8 am a 6 pm y los sábados de 8 am a 12 pm.', { delay: 1500 })
  .addAnswer('Nuestra clínica ofrece servicios médicos especializados en diversas áreas. ¿En qué área necesitas atención?', { delay: 1500 })

const flujoCitas = addKeyword(['citas', 'agenda'])
  .addAnswer('Para programar una cita, necesito tu nombre completo y número de cédula. ¿Podrías proporcionármelos?', { delay: 1500 })
  .addAnswer('¿En qué fecha y hora te gustaría programar la cita?', { delay: 1500 })

const flujoEspecialidades = addKeyword(['especialidades', 'médicos'])
  .addAnswer('Contamos con especialistas en diversas áreas médicas, como cardiología, gastroenterología, neurología, etc. ¿En qué área necesitas atención?', { delay: 1500 })
  .addAnswer('Para agendar una cita con un especialista, necesito tu nombre completo y número de cédula. ¿Podrías proporcionármelos?', { delay: 1500 })
  .addAnswer('¿En qué fecha y hora te gustaría programar la cita?', { delay: 1500 })

const flujoEmergencias = addKeyword(['emergencia', 'urgencias', 'accidente', 'lesión'])
  .addAnswer('Si se trata de una emergencia médica, por favor llama al número 911 inmediatamente. Si necesitas atención médica de urgencia en nuestra clínica, puedes acudir a nuestra sala de emergencias las 24 horas del día, los 7 días de la semana.', { delay: 1500 })

const flujoDespedida = addKeyword(['adiós', 'gracias', 'chao'])
  .addAnswer('Gracias por contactarnos. Esperamos haber sido de ayuda. ¡Que tengas un excelente día!', { delay: 1500 })

const conversacionPrincipal = addKeyword(['hola', 'buenas', 'saludos'])
  .addAnswer('¡Hola! Bienvenido a nuestra clínica.', { delay: 1500 })
  .addAnswer('¿En qué puedo ayudarte?', { delay: 1500 }, null, [flujoInfoGeneral, flujoCitas, flujoEspecialidades, flujoEmergencias])

const main = async () => {
  const adapterDB = new MockAdapter
