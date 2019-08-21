#include<stdio.h>
#define N  8
void make_A_Heap(int a[])
{
	int end=N,temp;
	while(end>1)
	{
		while(1)
	  { 
		int tag=0,pa=end/2;
		while(pa>0)
		{
			if(a[pa]<a[2*pa])
			{
				temp=a[pa];
				a[pa]=a[2*pa];
				a[2*pa]=temp;
				tag=1;
			}
			if(2*pa+1<=end&&a[pa]<a[2*pa+1])
			{
				temp=a[pa];
				a[pa]=a[2*pa+1];
				a[2*pa+1]=temp;
				tag=1;
			}
			pa--;
		}
		if(!tag) break;
	  } 
	temp=a[1];
	a[1]=a[end];
	a[end]=temp;
	end--;
	}
}
int main(void)
{
	int a[N+1]={0,3,2,5,8,4,7,6,9};
	make_A_Heap(a);
	for(int i=1;i<N+1;i++)
	printf("%5d",a[i]);
}
