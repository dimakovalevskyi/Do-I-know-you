# Do-I-know-you

##Описание проекта

Целью написания проекта была необходимость в создании "чего-то интересного при помощи AngularJS". 
В качестве вспомогательного для верстки фреймворка был использован всеми любимый Twitter Bootstrap 3.
Использовался AngularJS 1.

##Постановка задачи

В качестве решаемой задачи была выбрана проверка теории о шести рукопожатиях на пользователях сооциальной сети Вконтакте.
Алгоритм для поиска кратчайшего пути в графе "отношений" пользователей был выбран алгоритм двунаправленого поиска в ширину.
Суть заключается в одновременном поиске из начальной и конечной вершины.
Таким образом количество рассматриваемых вершин значительно уменьшается. 

##Возникшие нюансы во время разработки

Глубина поиска с конечной вершини равна 1. Глубина поиска с начальной вершини не ограничивается программно, 
только временем работы, и, возможно, оперативной памятью Вашего компьютера.
Во время тестирования было замечено: поиск может выполняться значительно быстрее, если пользователь1 (начальная вершина) 
имеет меньшее число друзей, чем пользователь2 (конечная вершина). Поэтому пользователь будет уведомлен о смене конечного 
и начального пользователей  местами, если это необходимо.
Алгоритм поиска получился рекурсивным. Поскольку коллбеки вызываются асинхронно, они не могут быть вызваны в цикле.
Возникала ситуация, когда коллбек ожидает окончания выполнения цикла, чтобы начать свою работу, 
а в нем хранится условие выхода из цикла и в итоге получался бесконечный цикл. 
Эта проблема и была решена использованием рекурсии. 

##Результаты работы

В итоге получился алгоритм, время выполения которго, как ни странно, очень зависит от количества друзей пользователей:)
Среднее время выполнения алгоритма колеблется от 10-ти секунд до 4-х минут. Но бывают и ситуации, в который путь 
находится практически моментально, либо наоборот алгоритм пыхтит больше 10-ти минут.
