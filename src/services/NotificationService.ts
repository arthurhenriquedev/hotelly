class NotificationService {
  async requestPermission(): Promise<void> {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          console.log('Permissão para notificações concedida.')
        } else {
          console.log('Permissão para notificações negada.')
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão para notificações:', error)
      }
    } else {
      console.log('Este navegador não suporta notificações.')
    }
  }

  sendNotification(title: string, options?: NotificationOptions): void {
    if (Notification.permission === 'granted') {
      new Notification(title, options)
    } else {
      console.log('Permissão para notificações não concedida.')
    }
  }
}

export default new NotificationService()
