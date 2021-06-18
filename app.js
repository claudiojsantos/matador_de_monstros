new Vue({
  el: '#container',
  data: {
    minimo: 0,
    maximo: 100,
    zona_perigo: 20,
    golpe_jogador: 0,
    valor_jogador: 100,
    golpe_monstro: 0,
    valor_monstro: 100,
    iniciar: true,
    fim: false,
    log: false,
    logs: [],
    style_jogador: {
      backgroundColor: 'green',
    },
    style_monstro: {
      backgroundColor: 'green',
    },
    barra_width_jogador: '100',
    barra_width_monstro: '100'
  },
  methods: {
    random(){
      return Math.floor((Math.random() * (12 - 5) + 5) * 1)
    },
    lanca_valores(sort) {
      valores = []
      valores.push(this.random())
      valores.push(this.random())

      if (sort) {
        valores.sort((a, b) => b - a)
      }

      return valores
    },
    verifica_barra_progresso(){
      if (this.valor_jogador < this.zona_perigo) {
        this.style_jogador.backgroundColor = 'red'
      } else {
        this.style_jogador.backgroundColor = 'green'
      }
      
      if (this.valor_monstro <= this.zona_perigo) {
        this.style_monstro.backgroundColor = 'red'
      } else {
        this.style_monstro.backgroundColor = 'green'
      }
    },
    reset() {
      this.valor_jogador = this.maximo
      this.barra_width_jogador = `${this.maximo}%`
      this.style_jogador.backgroundColor = 'green'
      this.valor_monstro = this.maximo
      this.barra_width_monstro = `${this.maximo}%`
      this.style_monstro.backgroundColor = 'green'
    },
    iniciar_jogo() {
      this.iniciar = false
      this.log = true
      this.logs = []
      this.fim = false
      this.reset()
    },
    fim_do_jogo() {
      if (this.valor_jogador <= this.minimo || this.valor_monstro <= this.minimo) {
        
        if (this.valor_jogador <= this.minimo) {
          this.barra_width_jogador = '0%'
          this.valor_jogador = this.minimo
        }

        if (this.valor_monstro <= this.minimo) {
          this.barra_width_monstro = '0%'
          this.valor_monstro = this.minimo
        }
        
        this.fim = true
        this.iniciar = true
      }
    },
    insert_logs(jogador, monstro, tipo) {
      this.logs.unshift({
        'jogador': tipo == 'ataque' ? `ATINGIU MONSTRO COM ${jogador}` : `GANHOU FORÇA DE ${jogador}`,
        'monstro': `ATINGIU JOGADOR COM ${monstro}`
      })
    },
    ataque() {
      if (this.valor_jogador > this.minimo && this.valor_monstro > this.minimo) {
        resultado = this.lanca_valores(true)
        this.valor_jogador -= resultado[0]
        this.valor_monstro -= resultado[1]
        this.insert_logs(resultado[0], resultado[1], 'ataque')
        this.barra_width_jogador = `${this.valor_jogador}%`;
        this.barra_width_monstro = `${this.valor_monstro}%`;
      }

      this.verifica_barra_progresso()     

      this.fim_do_jogo()
    },
    ataque_especial() {
      if (this.valor_jogador > this.minimo && this.valor_monstro > this.minimo) {
        resultado = this.lanca_valores(true)
        this.valor_monstro -= resultado[0]
        this.valor_jogador -= resultado[1]
        this.insert_logs(resultado[1], resultado[0], 'ataque')
        this.barra_width_jogador = `${this.valor_jogador}%`;
        this.barra_width_monstro = `${this.valor_monstro}%`;
      }

      this.verifica_barra_progresso()     

      this.fim_do_jogo()
    },
    curar() {
      resultado = this.lanca_valores(false)
      this.valor_jogador += resultado[0]
      this.valor_jogador -= resultado[1]
      this.insert_logs(resultado[0], resultado[1], 'curar')

      if (this.valor_jogador > this.minimo & this.valor_jogador < this.maximo) {
        this.barra_width_jogador = this.valor_jogador > this.maximo ? '100%' : `${this.valor_jogador}%`;
        this.verifica_barra_progresso()
      } else {
        this.valor_jogador = 100
        this.barra_width_jogador = '100%'
      }
    },
    desistir() {
      this.fim = false
      this.iniciar = true
      this.log = false
      this.logs = []
      this.reset()
    }
  }
})