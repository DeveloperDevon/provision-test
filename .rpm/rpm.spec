%define SHORTNAME provision-test
%define LONGNAME %{SHORTNAME}-client
%define APPDATADIR /nginx/sites/%{SHORTNAME}
%define NGINXCONFDIR /etc/nginx/conf.d

Name:           safecu-%{LONGNAME}
Version:        %(echo ${TAG:-latest})
#Version:        %{lua:print(os.getenv("TAG") or "latest")}
Release:        1%{?dist}
Summary:        Provision Test Client
License:        UNLICENSED
URL:            https://git.safecu.org/appdev?q=%{LONGNAME}
Source0:        %{LONGNAME}-%{version}.tar.gz
Requires:       bash nginx
Requires(pre):  shadow-utils
BuildArch:      noarch
AutoReqProv:    no

%description
Provision Test Client

%prep
%setup -q -n %{LONGNAME}

%build

%install

# make necessary directories
mkdir -p %{buildroot}%{APPDATADIR} \
    %{buildroot}%{NGINXCONFDIR}/location


## copy/install files
# nginx
install -m 644 nginx.location.conf %{buildroot}%{NGINXCONFDIR}/location/%{LONGNAME}.conf
# all content
cp -a build/* %{buildroot}%{APPDATADIR}


%files
%{APPDATADIR}/*
%{NGINXCONFDIR}/location/%{LONGNAME}.conf

%post
echo "## Changing ownership and permissions"
chown -R "nginx:nginx" "%{APPDATADIR}"
find "%{APPDATADIR}" -type f -exec chmod 664 {} + -o -type d -exec chmod 755 {} +

echo "## Fixing SELinux context"
semanage fcontext -a -t httpd_sys_content_t "%{APPDATADIR}(/.*)?" > /dev/null
restorecon -Rv "%{APPDATADIR}" > /dev/null

nginx -s reload

%postun
rm -f %{NGINXCONFDIR}/location/%{LONGNAME}.conf
nginx -s reload
rm -rf %{APPDATADIR}
