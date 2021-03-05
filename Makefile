short_name = provision-test
long_name = $(short_name)-client

target = artifacts/$(long_name)

# Add portable recursive wildcard function
rwildcard = $(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

meta_files = package.json package-lock.json tsconfig.json
test_files = $(call rwildcard,src/,*.test*.ts) $(call rwildcard,tests/,*.ts)
source_files = $(filter-out $(test_files), $(call rwildcard,src/,*.ts))

# Set default tag to short git sha with working directory status
TAG ?= $(shell git describe --match="" --always --abbrev=7)
version = $(long_name) $(shell git describe --match="" --always --dirty --abbrev=7) $(TAG)

clean-build:
	rm -rf build

clean-artifacts:
	rm -rf artifacts

clean-target:
	rm -rf $(target)
	rm -f $(target)-$(TAG).tar.gz

clean: clean-build clean-artifacts

build: clean-build $(source_files) $(meta_files)
	npm run build

	#echo "$(long_name) $(shell git describe --match="" --always --dirty --abbrev=7) $(TAG)" > $(target)/VERSION

bundle: clean-target
	mkdir -p $(target)
	cp -a build $(target)/build
	echo "$(version)" > $(target)/build/VERSION
	cp -a $(meta_files) $(target)/


zip: bundle
	tar -zcf $(target)-$(TAG).tar.gz -C artifacts $(long_name)

all: build zip

########################### RPM STUFF ###############################

rpmbuild_dir = .rpm/build
rpmbuild_src_dir = $(rpmbuild_dir)/SOURCES
rpmbuild_image = loganbickmore/rpmbuild:latest
# rpmbuild_image = docker.pkg.github.com/safecu/devops/rpmbuild:latest


# Append to meta_files
meta_files += .rpm/nginx.location.conf

rpm-clean:
	rm -rf $(rpmbuild_dir)

clean: clean-build clean-artifacts rpm-clean

rpm-prep: rpm-clean zip
	mkdir -p $(rpmbuild_src_dir)
	cp $(target)-$(TAG).tar.gz $(rpmbuild_src_dir)/

rpm: build zip rpm-prep
	docker run --rm --init -it -e "TAG=$(TAG)" -v $(shell pwd):/app --workdir /app $(rpmbuild_image) bash -c 'rpmbuild -bb .rpm/rpm.spec --define "_topdir /app/$(rpmbuild_dir)"'
	mv .rpm/build/RPMS/noarch/*.rpm artifacts

#########################################################
