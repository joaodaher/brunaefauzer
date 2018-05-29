#!/usr/bin/python3
# small web server that instruments "GET" but then serves up files
# to serve files using zero lines of code,  do
#
#   python -m http.server 8080     # python 3
#
# or
#
#   python -m SimpleHTTPServer 8080 # python 2
#
# I shamelessly snarfed from Gary Robinson
#    http://www.garyrobinson.net/2004/03/one_line_python.html
#


import http.server
import json
from urllib import parse

import sendgrid
import os
from sendgrid.helpers.mail import *


FROM_EMAIL = os.environ.get('FROM_EMAIL', 'joao.daher.neto@gmail.com')


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        self.data_string = self.rfile.read(int(self.headers['Content-Length']))

        data = parse.parse_qs(self.data_string.decode())
        email = data['inputemail'][0]
        amount = int(data['inputevents[]'][0]) - 1
        message = data['inputmessage'][0]
        name = data['inputname'][0]

        response = self.send_rsvp(email=email, name=name, amount=amount, message=message)

        if response.status_code == 202:
            self.send_confirmation(email=email, name=name, amount=amount)
            r = {
                'type': 'success',
                'text': "Seu RSVP foi enviado. Muito obrigado!",
            }
        else:
            r = {
                'type': 'error',
                'text': "Tente novamente mais tarde. :(",
            }

        self.send_response(response.status_code)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(r).encode())

    def send_rsvp(self, email, name, amount, message):
        sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
        from_email = Email(email)
        subject = f"[RSVP] {name} + {amount}"
        to_email = Email(FROM_EMAIL)
        content = Content("text/plain", f"{message}")
        mail = Mail(from_email, subject, to_email, content)
        return sg.client.mail.send.post(request_body=mail.get())

    def send_confirmation(self, email, name, amount):
        sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
        from_email = Email(FROM_EMAIL)
        subject = f"Casamento Bruna & Fauzer"
        to_email = Email(email)

        extra = ""
        plural = 's' if amount > 1 else ''
        if amount:
            extra = f"e mais {amount} pessoa{plural} "

        message = f"""
            {name},
            Sua presença está confirmada no nosso casamento!
            Aguardamos você {extra}no dia 17/11/2018.
            
            Obrigado!
            
            Bruna & Fauzer
            www.brunaefauzer.com.br
        """
        content = Content("text/plain", f"{message}")
        mail = Mail(from_email, subject, to_email, content)
        return sg.client.mail.send.post(request_body=mail.get())


s = http.server.HTTPServer(('', int(os.environ.get('PORT', '8080'))), Handler)
s.serve_forever()
