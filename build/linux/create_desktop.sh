abspath=`pwd`
# echo ${string//23/bb}  //abc1bb4bb41  双斜杠替换所有匹配    
abspath=${abspath//\//\\\/} #替换/为\/

sed "s/_pwd_/$abspath/g" meet.desktop > /tmp/meet.desktop

echo 'desktop is ready here: /tmp/meet.desktop; copy to ~/.local/share/applications to take effect'
