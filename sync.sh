gsutil defacl ch -u AllUsers:R gs://www.brunaefauzer.com.br
gsutil -m rsync -R ./site gs://www.brunaefauzer.com.br