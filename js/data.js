dayjs.extend(window.dayjs_plugin_customParseFormat);

const app = new Vue({
    el: "#root",
    data:{
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        current: 0,
        newMessage:"",
        search:"",
        flag:{
            boolean: false,
            position: 0,
        }
    },
    methods: {
        selectContact: function(index){
            this.current=index;
        },
        sendAMessage: function(){
            const newMessObj = {
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                message: this.newMessage,
                status: 'sent'
            };
            this.contacts[this.current].messages.push(newMessObj);
            this.newMessage="";
            this.replyMessage();
        },
        replyMessage: function(){
            const newMessObj = {
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                message: "Ok",
                status: 'received'
            };
            const cow=this;
            setTimeout(function(){
                cow.contacts[cow.current].messages.push(newMessObj);
            },1000);
        },
        searchContact: function(){
            this.contacts.forEach(element => {
                const name = element.name.toLowerCase();
                const search = this.search.toLowerCase();
                if(! name.includes(search) ){
                    element.visible=false;
                }
            });
        },
        hoursAndMinutes(date){
            const dateFormatted = dayjs(date,'DD/MM/YYYY HH:mm:ss');
            const hm = dayjs(dateFormatted).format('HH:mm')
            return hm;
        },
        showInfo(event,index){
            if (event !== undefined){
                if (this.flag.position === index){
                    this.flag.boolean= !this.flag.boolean;
                }
                else{
                    this.flag.boolean=true;
                }
                this.flag.position = index;
            }
        },
        deleteMessage(index){
            if (this.contacts[this.current].messages.length === 1){
                const emptyMessage={
                    date:"",
                    message:"non ci sono messaggi recenti",
                    status:""
                };
                this.contacts[this.current].messages.splice(index,1, emptyMessage)
            }
            else{
                this.contacts[this.current].messages.splice(index,1);
            }
        }
    }
})

