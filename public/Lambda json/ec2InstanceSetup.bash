/* steps to set up new EC2 instance */

/* log in */
ssh ec2-user@ipaddress -i ____.pem

/* once in */
sudo su
yum update -y
yum install httpd -y
service httpd start

/* set up so httpd starts on system boot */
chkconfig httpd on

/* create website */
cd /var/www/html
nano index.html


/* create website using S3 */
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
aws s3 cp s3://mywebsitebucket-vbloise3 /var/www/html --recursive

