Zimbra Bulk Reply Zimlet
==========

Bulk Reply allows you to reply to a lot of people without having to hit the reply button repeatedly, this can come in handy if you are organizing events or receive a lot of applications or proposals.

##### How to use Zimbra Bulk Reply Zimlet

- Select up to 100 email messages in a folder by scrolling down in your mailbox, do not use CTRL+A and CTRL+SHIFT+A as this will not work.
- Drag and drop them on to the Bulk Reply menu icon.

If you find Zimbra Bulk Reply Zimlet useful and want to support its continued development, you can make donations via:
- PayPal: info@barrydegraaff.tk
- Bank transfer: IBAN NL55ABNA0623226413 ; BIC ABNANL2A

This Zimlet is designed for Zimbra version 8.6.

This Zimlet is not available for use in Zimbra Desktop.

Bugs and feedback: https://github.com/Zimbra-Community/bulkreply-zimlet/issues

##### Install the Bulk Reply Zimlet
The recommended method is to deploy using git. (I no longer support zmzimletctl, although that still works.)

    [root@myzimbra ~]# yum install -y git 
    [root@myzimbra ~]# apt-get -y install git
    [root@myzimbra ~]# cd ~
    [root@myzimbra ~]# rm bulkreply-zimlet -Rf
    [root@myzimbra ~]# git clone https://github.com/Zimbra-Community/bulkreply-zimlet
    [root@myzimbra ~]# cd bulkreply-zimlet
    [root@myzimbra bulkreply-zimlet]# git checkout 0.0.1
    [root@myzimbra bulkreply-zimlet]# chmod +rx install-dev.sh
    [root@myzimbra bulkreply-zimlet]# ./install.sh
    [root@myzimbra bulkreply-zimlet]# su zimbra
    [zimbra@myzimbra bulkreply-zimlet] zmprov mc default zimbraPrefZimletTreeOpen TRUE
    [zimbra@myzimbra bulkreply-zimlet] zmcontrol restart
